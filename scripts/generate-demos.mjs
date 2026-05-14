#!/usr/bin/env node
// Personalised demo generator.
// Reads Apollo CSV → for each brand: scrape Shopify, classify gender, pick products,
// call Gemini try-on, QA via Gemini Vision, write JSON manifest + images, append output.csv.
// Pauses for "continue" after each batch of BATCH_SIZE brands.

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── Config ───────────────────────────────────────────────────────────────────
const CSV_PATH = '/Users/sydneystones/Downloads/apollo-storeleads-export2.csv';
const BATCH_SIZE = Number(process.env.DEMO_BATCH_SIZE) || 20;
const MAX_BRANDS = Number(process.env.DEMO_MAX_BRANDS) || Infinity;
const EXCLUDE_INDUSTRIES = ['airlines', 'aviation', 'medical', 'doctor', 'hospital'];
const MAX_PRODUCTS_PER_DEMO = 1;
const MIN_PRODUCTS_TO_PUBLISH = 1;
const GEMINI_IMAGE_MODEL = process.env.GEMINI_TRYON_MODEL || 'gemini-3.1-flash-image-preview';
const GEMINI_VISION_MODEL = 'gemini-2.5-flash';
const API_KEY = process.env.GEMINI_ADMIN_API_KEY;
const OUTPUT_CSV = path.join(ROOT, 'scripts', 'output.csv');
const SKIPPED_CSV = path.join(ROOT, 'scripts', 'skipped.csv');
const EMAILS_CSV = path.join(ROOT, 'scripts', 'emails.csv');
const OVERRIDES_FILE = path.join(ROOT, 'scripts', 'overrides.json');
const EMAIL_SENDERS = [
  'mail@renderedfits.com',
  'mail@getrenderedfits.com',
  'mail@tryrenderedfits.com',
];

let OVERRIDES = { remove: [], redo: {} };
function loadOverrides() {
  if (fs.existsSync(OVERRIDES_FILE)) {
    OVERRIDES = JSON.parse(fs.readFileSync(OVERRIDES_FILE, 'utf8'));
    OVERRIDES.remove = OVERRIDES.remove || [];
    OVERRIDES.redo = OVERRIDES.redo || {};
  }
}
const STATE_FILE = path.join(ROOT, 'scripts', '.demo-gen-state.json');
const MANIFEST_DIR = path.join(ROOT, 'public', 'demos-data');
const IMAGES_DIR = path.join(ROOT, 'public', 'demos-images');
const APPROVALS_FILE = path.join(MANIFEST_DIR, 'approvals.json');

const MODELS = {
  women: [
    { name: 'ebba', face: path.join(ROOT, 'public/demo-models/ebba/face.png'), body: path.join(ROOT, 'public/demo-models/ebba/body.png') },
  ],
  men: [
    { name: 'lukas', face: path.join(ROOT, 'public/demo-models/lukas/face.png'), body: path.join(ROOT, 'public/demo-models/lukas/body.png') },
    { name: 'otto',  face: path.join(ROOT, 'public/demo-models/otto/face.png'),  body: path.join(ROOT, 'public/demo-models/otto/body.png')  },
  ],
};

// Deterministic model pick per brand slug — same brand always rotates to same model.
function pickModel(modelGender, slug) {
  const pool = modelGender === 'men' ? MODELS.men : MODELS.women;
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return pool[Math.abs(h) % pool.length];
}

const TRYON_PROMPT = `Generate a photorealistic fashion photograph of the person in the customer photos wearing the product from the product images. Where a product image shows the product being worn by a model, use that shot as the direct compositional reference — match its framing, crop, and camera distance exactly. Dress the person in every item shown across the product images, reproducing colours, textures, patterns, logos, and construction exactly. Completely replace all clothing and footwear from the customer photos with the product. Add complementary footwear if none is shown in the product images. For jewellery like earrings, necklaces, bracelets, pendants frame the shot as a close up headshot from the neckline up, showing the item being tried on as the main focus of the image.

Preserve this person's face, skin tone, hair, body shape, and natural expression exactly as they appear — do not idealise, alter, or add a smile.

The pose should feel natural, neutral and confident. Light grey seamless studio backdrop, soft directional studio lighting, 85mm portrait lens, 9:16 aspect ratio. Indistinguishable from a professional e-commerce shoot.`;

const QA_PROMPT = `Does this image show a person realistically wearing the garment? Respond ONLY with PASS or FAIL and a one-sentence reason.`;

if (!API_KEY) {
  console.error('Missing GEMINI_ADMIN_API_KEY in env. Set it before running.');
  process.exit(1);
}

fs.mkdirSync(MANIFEST_DIR, { recursive: true });
fs.mkdirSync(IMAGES_DIR, { recursive: true });

// ─── CSV parser (handles quoted fields, embedded commas, escaped quotes) ──────
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQ = false, i = 0;
  while (i < text.length) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i += 2; continue; }
      if (c === '"') { inQ = false; i++; continue; }
      field += c; i++; continue;
    }
    if (c === '"') { inQ = true; i++; continue; }
    if (c === ',') { row.push(field); field = ''; i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    field += c; i++;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function csvEscape(v) {
  if (v == null) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// ─── Slug helper ──────────────────────────────────────────────────────────────
function slugify(s) {
  return String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 64);
}

function normaliseDomain(raw) {
  if (!raw) return null;
  let d = String(raw).trim().toLowerCase();
  d = d.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
  if (!d || !d.includes('.')) return null;
  return d;
}

// ─── Step 1: Shopify inventory ────────────────────────────────────────────────
async function fetchShopifyProducts(domain) {
  const url = `https://${domain}/products.json?limit=50`;
  const r = await fetch(url, { signal: AbortSignal.timeout(15000) }).catch(() => null);
  if (!r || !r.ok) return { ok: false, reason: `products.json HTTP ${r?.status ?? 'fetch failed'}` };
  const ct = r.headers.get('content-type') || '';
  if (!ct.includes('json')) return { ok: false, reason: 'non-JSON response (not Shopify)' };
  const data = await r.json().catch(() => null);
  if (!data || !Array.isArray(data.products)) return { ok: false, reason: 'malformed products.json' };
  return { ok: true, products: data.products };
}

// ─── Step 2: Gender classification ────────────────────────────────────────────
const WOMEN_KW = ['women', 'womens', "women's", 'womenswear', 'female', 'ladies', 'ladie', 'her'];
const MEN_KW = ['men', 'mens', "men's", 'menswear', 'male', 'gents', 'him'];

function countGenderHits(text) {
  const t = ` ${String(text).toLowerCase()} `;
  let w = 0, m = 0;
  for (const k of WOMEN_KW) if (t.includes(` ${k} `) || t.includes(` ${k},`) || t.includes(` ${k}.`)) w++;
  for (const k of MEN_KW) if (t.includes(` ${k} `) || t.includes(` ${k},`) || t.includes(` ${k}.`)) m++;
  return { w, m };
}

function classifyGender(products) {
  let w = 0, m = 0;
  for (const p of products) {
    const blob = [p.product_type, (p.tags || []).join(' '), p.title].filter(Boolean).join(' ');
    const h = countGenderHits(blob);
    if (h.w > h.m) w++;
    else if (h.m > h.w) m++;
  }
  const total = w + m;
  if (total === 0) return { gender: 'unisex', confidence: 'low' };
  const wPct = w / total, mPct = m / total;
  if (wPct >= 0.75) return { gender: 'women', confidence: 'high' };
  if (mPct >= 0.75) return { gender: 'men', confidence: 'high' };
  return { gender: 'both', confidence: total > 10 ? 'high' : 'medium' };
}

function productGender(p) {
  const blob = [p.product_type, (p.tags || []).join(' '), p.title].filter(Boolean).join(' ');
  const h = countGenderHits(blob);
  if (h.w > h.m) return 'women';
  if (h.m > h.w) return 'men';
  return null;
}

// ─── Step 3: Product selection ────────────────────────────────────────────────
const HERO_TYPES = ['coat', 'jacket', 'outerwear', 'dress', 'blazer', 'suit', 'shirt', 'blouse',
                    'jumper', 'sweater', 'knit', 'cardigan', 'top', 'trouser', 'pant', 'skirt',
                    'necklace', 'earring', 'bracelet', 'pendant', 'ring'];
const SKIP_TYPES = ['shoe', 'sneaker', 'boot', 'bag', 'belt', 'hat', 'cap', 'sock', 'swim',
                    'bikini', 'underwear', 'lingerie', 'sunglass', 'wallet', 'fragrance', 'candle',
                    'gift card', 'gift-card', 'setup fee', 'art fee', 'tape', 'sticker', 'patch',
                    'panty', 'panties', 'bra', 'thong', 'g-string', 'g string',
                    'greeting card', 'backpack', 'rucksack', 'sandal', 'flip flop',
                    'hair', 'wig', 'extension', 'fabric', 'yarn', 'thread'];

function productScore(p) {
  const blob = `${p.product_type || ''} ${p.title || ''} ${(p.tags || []).join(' ')}`.toLowerCase();
  if (SKIP_TYPES.some(k => blob.includes(k))) return -1;
  let s = 0;
  if (HERO_TYPES.some(k => blob.includes(k))) s += 10;
  if (p.images && p.images.length) s += Math.min(p.images.length, 3);
  if (p.title && /look|set|outfit/.test(p.title.toLowerCase())) s += 2;
  return s;
}

function selectProducts(products, gender) {
  const ranked = products
    .map(p => ({ p, g: productGender(p), score: productScore(p) }))
    .filter(x => x.score > 0 && x.p.images && x.p.images.length)
    .sort((a, b) => b.score - a.score);

  if (gender === 'both') {
    const w = ranked.filter(x => x.g === 'women').slice(0, 2);
    const m = ranked.filter(x => x.g === 'men').slice(0, 1);
    return [...w, ...m].slice(0, MAX_PRODUCTS_PER_DEMO).map(x => ({ ...x.p, _gender: x.g || 'women' }));
  }
  return ranked.slice(0, MAX_PRODUCTS_PER_DEMO).map(x => ({ ...x.p, _gender: gender }));
}

// (model picking is handled by pickModel(slug, gender))

// ─── Image fetch / encode ─────────────────────────────────────────────────────
async function fetchImageBase64(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(20000) }).catch(() => null);
  if (!r || !r.ok) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  const mime = r.headers.get('content-type') || 'image/jpeg';
  return { data: buf.toString('base64'), mime };
}

function fileToBase64(p) {
  const buf = fs.readFileSync(p);
  const ext = path.extname(p).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  return { data: buf.toString('base64'), mime };
}

// ─── Step 5: Gemini try-on generation ─────────────────────────────────────────
async function geminiTryOn(productImageUrls, model) {
  const productImages = [];
  for (const u of productImageUrls.slice(0, 3)) {
    const img = await fetchImageBase64(u);
    if (img) productImages.push(img);
  }
  if (productImages.length === 0) return { ok: false, reason: 'no product images fetchable' };
  const face = fileToBase64(model.face);
  const body = fileToBase64(model.body);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_IMAGE_MODEL}:generateContent?key=${API_KEY}`;
  const body_ = {
    contents: [{
      parts: [
        { inlineData: { mimeType: face.mime, data: face.data } },
        { inlineData: { mimeType: body.mime, data: body.data } },
        ...productImages.map(p => ({ inlineData: { mimeType: p.mime, data: p.data } })),
        { text: TRYON_PROMPT },
      ],
    }],
    generationConfig: { responseModalities: ['IMAGE'] },
  };
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                               body: JSON.stringify(body_), signal: AbortSignal.timeout(120000) });
  if (!r.ok) return { ok: false, reason: `try-on HTTP ${r.status}: ${(await r.text()).slice(0, 200)}` };
  const data = await r.json();
  const part = data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (!part) return { ok: false, reason: 'no image in response' };
  return { ok: true, data: part.inlineData.data, mime: part.inlineData.mimeType || 'image/png' };
}

// ─── Step 5b: Vision QA ───────────────────────────────────────────────────────
async function geminiQA(imageB64, mime) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_VISION_MODEL}:generateContent?key=${API_KEY}`;
  const body_ = {
    contents: [{
      parts: [
        { inlineData: { mimeType: mime, data: imageB64 } },
        { text: QA_PROMPT },
      ],
    }],
  };
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                               body: JSON.stringify(body_), signal: AbortSignal.timeout(60000) });
  if (!r.ok) return { pass: false, reason: `QA HTTP ${r.status}` };
  const data = await r.json();
  const txt = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return { pass: /^pass\b/i.test(txt.trim()), reason: txt.trim().slice(0, 200) };
}

// ─── Cost tracking (approx, public list pricing as of Apr 2026) ───────────────
const COST_PER_IMAGE_GEN = 0.039;   // gemini-3.1-flash-image, per output image
const COST_PER_QA = 0.0003;          // gemini-2.5-flash vision call, rough
let totalCost = 0;
let totalGenTimeMs = 0;
let totalGens = 0;

// ─── Per-brand pipeline ───────────────────────────────────────────────────────
async function processBrand(lead) {
  const brandName = lead.brandName;
  const domain = lead.domain;
  const slug = slugify(brandName);

  console.log(`\n→ ${brandName} (${domain})`);
  const inv = await fetchShopifyProducts(domain);
  if (!inv.ok) return { status: 'skipped', reason: inv.reason, slug };

  const cls = classifyGender(inv.products);
  console.log(`  gender: ${cls.gender} (${cls.confidence})`);

  const picks = selectProducts(inv.products, cls.gender);
  if (picks.length < 1) return { status: 'skipped', reason: 'no suitable products', slug, gender: cls.gender };

  // Per-brand overrides (forceGender, forceModel, skipProductHandle)
  const ov = OVERRIDES.redo[slug] || {};
  const skipHandle = ov.skipProductHandle;
  const filteredPicks = skipHandle ? picks.filter(p => p.handle !== skipHandle) : picks;
  if (filteredPicks.length < 1) return { status: 'skipped', reason: 'no products after skipProductHandle filter', slug, gender: cls.gender };
  const forcedGender = ov.forceGender;
  const forcedModelName = ov.forceModel;
  const maxProductImages = ov.maxProductImages || 3;

  const tryOns = [];
  for (const p of filteredPicks) {
    const imgUrls = (p.images || []).map(im => im.src).filter(Boolean).slice(0, maxProductImages);
    if (imgUrls.length === 0) continue;
    const effectiveGender = forcedGender || p._gender;
    let model = pickModel(effectiveGender, slug);
    if (forcedModelName) {
      const pool = [...MODELS.women, ...MODELS.men];
      const found = pool.find(m => m.name === forcedModelName);
      if (found) model = found;
    }
    p._gender = effectiveGender; // ensure manifest records the resolved gender
    const tStart = Date.now();
    let gen = await geminiTryOn(imgUrls, model);
    if (!gen.ok) {
      console.log(`    retry: ${gen.reason}`);
      gen = await geminiTryOn(imgUrls, model);
    }
    totalGenTimeMs += Date.now() - tStart;
    totalGens++;
    totalCost += COST_PER_IMAGE_GEN;
    if (!gen.ok) { console.log(`    × ${p.title}: ${gen.reason}`); continue; }

    const qa = await geminiQA(gen.data, gen.mime);
    totalCost += COST_PER_QA;
    if (!qa.pass) {
      console.log(`    QA fail (${qa.reason}); regenerating once`);
      const gen2 = await geminiTryOn(imgUrls, model);
      totalGens++;
      totalCost += COST_PER_IMAGE_GEN;
      if (!gen2.ok) { console.log(`    × ${p.title}: regen failed`); continue; }
      const qa2 = await geminiQA(gen2.data, gen2.mime);
      totalCost += COST_PER_QA;
      if (!qa2.pass) { console.log(`    × ${p.title}: QA failed twice`); continue; }
      gen = gen2;
    }

    const ext = gen.mime.includes('png') ? 'png' : 'jpg';
    const outDir = path.join(IMAGES_DIR, slug);
    fs.mkdirSync(outDir, { recursive: true });
    const fname = `${p.handle}.${ext}`;
    fs.writeFileSync(path.join(outDir, fname), Buffer.from(gen.data, 'base64'));

    const customerImages = {
      face: `/demo-models/${model.name}/face.png`,
      body: `/demo-models/${model.name}/body.png`,
    };

    const variant = (p.variants && p.variants[0]) || {};
    const priceRaw = variant.price;
    const price = priceRaw ? `£${Number(priceRaw).toFixed(2)}` : null;

    tryOns.push({
      title: p.title,
      handle: p.handle,
      price,
      productImage: imgUrls[0],
      productImages: imgUrls,
      tryOnImage: `/demos-images/${slug}/${fname}`,
      modelGender: p._gender,
      modelName: model.name,
      customerImages,
    });
    console.log(`    ✓ ${p.title} (model: ${model.name})`);
  }

  const complete = tryOns.length >= MIN_PRODUCTS_TO_PUBLISH;
  if (tryOns.length === 0) return { status: 'skipped', reason: 'all generations failed', slug, gender: cls.gender };

  const manifest = {
    slug,
    brandName,
    brandDomain: domain,
    generatedOn: new Date().toISOString().slice(0, 10),
    genderClassification: cls.gender,
    classificationConfidence: cls.confidence,
    tryOns,
  };
  fs.writeFileSync(path.join(MANIFEST_DIR, `${slug}.json`), JSON.stringify(manifest, null, 2));

  return {
    status: complete ? 'complete' : 'incomplete',
    slug,
    gender: cls.gender,
    notes: complete ? '' : `only ${tryOns.length} passing image(s)`,
  };
}

// ─── Output CSV writers ───────────────────────────────────────────────────────
function appendOutput(lead, result) {
  const header = 'brand_name,brand_domain,contact_first_name,contact_email,demo_url,gender_classification,demo_status,notes\n';
  if (!fs.existsSync(OUTPUT_CSV)) fs.writeFileSync(OUTPUT_CSV, header);
  const demoUrl = result.status === 'complete' || result.status === 'incomplete'
    ? `https://renderedfits.com/demos/${result.slug}` : '';
  fs.appendFileSync(OUTPUT_CSV, [
    csvEscape(lead.brandName), csvEscape(lead.domain), csvEscape(lead.firstName),
    csvEscape(lead.email), csvEscape(demoUrl), csvEscape(result.gender || ''),
    csvEscape(result.status), csvEscape(result.notes || ''),
  ].join(',') + '\n');
}

function buildEmails(lead, demoUrl) {
  const t1Subject = `Rendered Fits X ${lead.brandName}`;
  const t1Body =
`Hi ${lead.firstName},

I'm Sydney, co-founder of Rendered Fits. The industry leading virtual try-on app for premium fashion brands on Shopify. I generated a short demo using your products to show you how it works and how it could benefit ${lead.brandName}.

Have a look: ${demoUrl}

Let me know if this is something of interest.

Best,
Sienna`;

  const t2Subject = `re: Rendered Fits × ${lead.brandName}`;
  const t2Body =
`Hi ${lead.firstName},

Following up on the ${lead.brandName} try-on demo I made custom for you: ${demoUrl}

If virtual try-on is something ${lead.brandName} is thinking about, I'd be glad to walk through how it would look on a wider range of your products on a quick call.

Best,
Sienna`;

  const t3Subject = `re: Rendered Fits × ${lead.brandName}`;
  const t3Body =
`Hi ${lead.firstName},

The reason I built ${lead.brandName} a try-on demo: most fashion brands I speak to have a returns problem they've stopped trying to solve because the solutions all involve building something themselves.

Rendered Fits virtual try-on is the solution, installed from straight from the Shopify App Store, built specifically for brands like you. Here's how it would look for ${lead.brandName}: ${demoUrl}.

Best,
Sienna`;

  return { t1Subject, t1Body, t2Subject, t2Body, t3Subject, t3Body };
}

function appendEmail(lead, demoUrl, sender) {
  const header = 'sender_email,contact_first_name,contact_email,brand_name,demo_url,' +
                 'touch_1_send_day,touch_1_subject,touch_1_body,' +
                 'touch_2_send_day,touch_2_subject,touch_2_body,' +
                 'touch_3_send_day,touch_3_subject,touch_3_body\n';
  if (!fs.existsSync(EMAILS_CSV)) fs.writeFileSync(EMAILS_CSV, header);
  const e = buildEmails(lead, demoUrl);
  fs.appendFileSync(EMAILS_CSV, [
    csvEscape(sender), csvEscape(lead.firstName), csvEscape(lead.email),
    csvEscape(lead.brandName), csvEscape(demoUrl),
    csvEscape('0'),  csvEscape(e.t1Subject), csvEscape(e.t1Body),
    csvEscape('3'),  csvEscape(e.t2Subject), csvEscape(e.t2Body),
    csvEscape('10'), csvEscape(e.t3Subject), csvEscape(e.t3Body),
  ].join(',') + '\n');
}

function appendSkipped(lead, reason) {
  const header = 'brand_name,brand_domain,reason\n';
  if (!fs.existsSync(SKIPPED_CSV)) fs.writeFileSync(SKIPPED_CSV, header);
  fs.appendFileSync(SKIPPED_CSV, [csvEscape(lead.brandName), csvEscape(lead.domain), csvEscape(reason)].join(',') + '\n');
}

// ─── State (resume support) ───────────────────────────────────────────────────
function loadState() {
  if (!fs.existsSync(STATE_FILE)) return { processedDomains: [], completedCount: 0, senderBySlug: {}, blockedSlugs: [] };
  const s = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  if (typeof s.completedCount !== 'number') s.completedCount = 0;
  if (!s.senderBySlug) s.senderBySlug = {};
  if (!s.blockedSlugs) s.blockedSlugs = [];
  return s;
}

// Strip CSV rows whose demo_url slug is in `purgeSlugs`
function filterCSV(csvPath, slugColField, purgeSlugs) {
  if (!fs.existsSync(csvPath)) return;
  const rows = parseCSV(fs.readFileSync(csvPath, 'utf8'));
  if (rows.length < 2) return;
  const h = rows[0];
  const idx = h.findIndex(c => c === slugColField);
  if (idx < 0) return;
  const keep = [h];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i]; if (!r || r.length < 2) continue;
    const m = (r[idx] || '').match(/\/demos\/([^/]+)$/);
    if (m && purgeSlugs.has(m[1])) continue;
    keep.push(r);
  }
  fs.writeFileSync(csvPath, keep.map(r => r.map(csvEscape).join(',')).join('\n') + '\n');
}

// Apply overrides at start of run: delete manifests/images, scrub CSVs, requeue redos
function applyOverrides(state) {
  const removes = new Set(OVERRIDES.remove);
  const redos = new Set(Object.keys(OVERRIDES.redo));

  // Auto-requeue any slug marked 'rejected' in approvals.json
  let autoRequeued = 0;
  if (fs.existsSync(APPROVALS_FILE)) {
    const approvals = JSON.parse(fs.readFileSync(APPROVALS_FILE, 'utf8'));
    for (const [slug, approvalState] of Object.entries(approvals)) {
      if (approvalState === 'rejected' && !redos.has(slug)) { redos.add(slug); autoRequeued++; }
    }
  }
  const purge = new Set([...removes, ...redos]);
  if (purge.size === 0) return;

  // slug → domain map (from current output.csv before scrubbing)
  const slugToDomain = new Map();
  if (fs.existsSync(OUTPUT_CSV)) {
    const rows = parseCSV(fs.readFileSync(OUTPUT_CSV, 'utf8'));
    const h = rows[0];
    const ixUrl = h.findIndex(c => c === 'demo_url');
    const ixDom = h.findIndex(c => c === 'brand_domain');
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i]; if (!r || r.length < 2) continue;
      const m = (r[ixUrl] || '').match(/\/demos\/([^/]+)$/);
      if (m) slugToDomain.set(m[1], r[ixDom]);
    }
  }

  // Delete manifests + image dirs
  for (const slug of purge) {
    const mf = path.join(MANIFEST_DIR, `${slug}.json`);
    if (fs.existsSync(mf)) fs.unlinkSync(mf);
    const id = path.join(IMAGES_DIR, slug);
    if (fs.existsSync(id)) fs.rmSync(id, { recursive: true, force: true });
  }

  // Remove purged slugs from approvals.json (redos need re-review; removes are gone)
  if (fs.existsSync(APPROVALS_FILE)) {
    const approvals = JSON.parse(fs.readFileSync(APPROVALS_FILE, 'utf8'));
    for (const slug of purge) delete approvals[slug];
    fs.writeFileSync(APPROVALS_FILE, JSON.stringify(approvals, null, 2));
  }

  // Scrub CSVs
  filterCSV(OUTPUT_CSV, 'demo_url', purge);
  filterCSV(EMAILS_CSV, 'demo_url', purge);

  // For redos: requeue (drop from processedDomains)
  // For removes: add to blockedSlugs (and KEEP domain in processedDomains so it's skipped silently)
  const domainsToRequeue = new Set();
  for (const slug of redos) {
    const dom = slugToDomain.get(slug);
    if (dom) domainsToRequeue.add(dom);
  }
  state.processedDomains = state.processedDomains.filter(d => !domainsToRequeue.has(d));
  state.blockedSlugs = Array.from(new Set([...state.blockedSlugs, ...removes]));

  // Drop sender assignments for redos so they can re-stick if needed; remove sender for blocks
  for (const slug of purge) delete state.senderBySlug[slug];

  saveState(state);
  console.log(`Overrides applied: ${removes.size} removes, ${redos.size} redos (${autoRequeued} auto-requeued from rejected approvals). Requeued ${domainsToRequeue.size} domains.\n`);
}
function saveState(s) { fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2)); }

// ─── Lead extraction (deduped by domain) ──────────────────────────────────────
function extractLeads() {
  const text = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCSV(text);
  const header = rows[0];
  const idx = (name) => header.findIndex(h => h.trim().toLowerCase() === name.toLowerCase());
  const iFirst = idx('First Name'), iCompany = idx('Company Name'), iEmail = idx('Email'),
        iSite = idx('Website'), iIndustry = idx('Industry');

  const seen = new Set();
  const leads = [];
  let filtered = 0;
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r]; if (!row || row.length < 2) continue;
    const domain = normaliseDomain(row[iSite]);
    const brandName = (row[iCompany] || '').trim();
    if (!domain || !brandName) continue;
    if (seen.has(domain)) continue;
    const industry = ((row[iIndustry] || '') + '').toLowerCase();
    if (EXCLUDE_INDUSTRIES.some(k => industry.includes(k))) { filtered++; continue; }
    seen.add(domain);
    leads.push({
      brandName, domain,
      firstName: (row[iFirst] || '').trim(),
      email: (row[iEmail] || '').trim(),
    });
  }
  if (filtered) console.log(`Filtered out ${filtered} non-fashion-industry leads.`);
  return leads;
}

// All contacts grouped by domain (one entry per row in CSV; NOT deduped).
function extractAllContactsByDomain() {
  const text = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = parseCSV(text);
  const header = rows[0];
  const idx = (name) => header.findIndex(h => h.trim().toLowerCase() === name.toLowerCase());
  const iFirst = idx('First Name'), iCompany = idx('Company Name'), iEmail = idx('Email'),
        iSite = idx('Website'), iIndustry = idx('Industry');
  const byDomain = new Map();
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r]; if (!row || row.length < 2) continue;
    const domain = normaliseDomain(row[iSite]);
    if (!domain) continue;
    const industry = ((row[iIndustry] || '') + '').toLowerCase();
    if (EXCLUDE_INDUSTRIES.some(k => industry.includes(k))) continue;
    const brandName = (row[iCompany] || '').trim();
    const firstName = (row[iFirst] || '').trim();
    const email = (row[iEmail] || '').trim();
    if (!email) continue;
    if (!byDomain.has(domain)) byDomain.set(domain, []);
    byDomain.get(domain).push({ brandName, domain, firstName, email });
  }
  return byDomain;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  loadOverrides();
  const leads = extractLeads();
  const allContactsByDomain = extractAllContactsByDomain();
  console.log(`Loaded ${leads.length} unique brand-domain leads (${[...allContactsByDomain.values()].reduce((a,b)=>a+b.length,0)} total individual contacts).`);

  const state = loadState();
  applyOverrides(state);
  const done = new Set(state.processedDomains);
  const blockedSlugs = new Set(state.blockedSlugs);
  let todo = leads.filter(l => !done.has(l.domain) && !blockedSlugs.has(slugify(l.brandName)));
  if (MAX_BRANDS !== Infinity) todo = todo.slice(0, MAX_BRANDS);
  console.log(`${done.size} already processed; ${todo.length} to process this run (batch size ${BATCH_SIZE}).\n`);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  let batchIdx = 0;
  for (let i = 0; i < todo.length; i += BATCH_SIZE) {
    batchIdx++;
    const batch = todo.slice(i, i + BATCH_SIZE);
    let complete = 0, incomplete = 0, skipped = 0;
    const batchStart = Date.now();

    for (const lead of batch) {
      try {
        const res = await processBrand(lead);
        if (res.status === 'skipped') { appendSkipped(lead, res.reason); skipped++; }
        else if (res.status === 'complete') {
          appendOutput(lead, res);
          // Allocate sticky sender for this slug if not yet assigned
          if (!state.senderBySlug[res.slug]) {
            state.senderBySlug[res.slug] = EMAIL_SENDERS[state.completedCount % EMAIL_SENDERS.length];
            state.completedCount++;
          }
          complete++;
        }
        else { appendOutput(lead, res); incomplete++; }
      } catch (e) {
        console.log(`  ! exception: ${e.message}`);
        appendSkipped(lead, `exception: ${e.message}`);
        skipped++;
      }
      done.add(lead.domain);
      state.processedDomains = [...done];
      saveState(state);
    }

    const batchSec = ((Date.now() - batchStart) / 1000).toFixed(0);
    const avgGen = totalGens ? (totalGenTimeMs / totalGens / 1000).toFixed(1) : '0';
    console.log(`\n── Batch ${batchIdx} done (${batchSec}s) ──`);
    console.log(`  complete:   ${complete}`);
    console.log(`  incomplete: ${incomplete}`);
    console.log(`  skipped:    ${skipped}`);
    console.log(`  total Gemini cost so far: $${totalCost.toFixed(2)}`);
    console.log(`  avg generation time: ${avgGen}s`);
    console.log(`  progress: ${done.size}/${leads.length}\n`);

    if (i + BATCH_SIZE >= todo.length) break;
    const ans = (await rl.question('Type "continue" to process next batch, anything else to stop: ')).trim().toLowerCase();
    if (ans !== 'continue') { console.log('Stopping. Resume by re-running — state persisted.'); break; }
  }

  rl.close();

  // Rebuild emails.csv deterministically from manifests + all contacts
  rebuildEmailsCsv(allContactsByDomain, state);
  saveState(state);

  // Rebuild admin index from current manifests + CSV data
  writeAdminIndex();

  console.log(`\nOutputs: ${OUTPUT_CSV}\n        ${SKIPPED_CSV}\n        ${EMAILS_CSV}\n        ${path.join(MANIFEST_DIR, 'index.json')}`);
}

function rebuildEmailsCsv(allContactsByDomain, state) {
  const header = 'sender_email,contact_first_name,contact_email,brand_name,demo_url,' +
                 'touch_1_send_day,touch_1_subject,touch_1_body,' +
                 'touch_2_send_day,touch_2_subject,touch_2_body,' +
                 'touch_3_send_day,touch_3_subject,touch_3_body';
  const out = [header];

  // Iterate manifests deterministically (alphabetical by slug for stable output)
  const files = fs.readdirSync(MANIFEST_DIR).filter(f => f.endsWith('.json') && f !== 'index.json').sort();
  let totalEmails = 0;
  const senderCounts = {};
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(path.join(MANIFEST_DIR, f), 'utf8'));
    const slug = data.slug;
    const domain = data.brandDomain;
    const brandName = data.brandName;
    const demoUrl = `https://renderedfits.com/demos/${slug}`;
    // Assign sticky sender if not yet
    if (!state.senderBySlug[slug]) {
      state.senderBySlug[slug] = EMAIL_SENDERS[state.completedCount % EMAIL_SENDERS.length];
      state.completedCount++;
    }
    const sender = state.senderBySlug[slug];
    senderCounts[sender] = senderCounts[sender] || 0;
    const contacts = allContactsByDomain.get(domain) || [];
    for (const c of contacts) {
      const e = buildEmails({ ...c, brandName }, demoUrl);
      out.push([
        sender, c.firstName, c.email, brandName, demoUrl,
        '0',  e.t1Subject, e.t1Body,
        '3',  e.t2Subject, e.t2Body,
        '10', e.t3Subject, e.t3Body,
      ].map(csvEscape).join(','));
      senderCounts[sender]++;
      totalEmails++;
    }
  }
  fs.writeFileSync(EMAILS_CSV, out.join('\n') + '\n');
  console.log(`\nemails.csv rebuilt: ${totalEmails} rows across ${files.length} demos.`);
  console.log(`Sender split:`, senderCounts);
}

function writeAdminIndex() {
  // Map slug → lead row from output.csv (for contact info)
  const leadBySlug = new Map();
  if (fs.existsSync(OUTPUT_CSV)) {
    const rows = parseCSV(fs.readFileSync(OUTPUT_CSV, 'utf8'));
    const h = rows[0];
    const ix = (n) => h.findIndex(c => c === n);
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i]; if (!r || !r[ix('demo_url')]) continue;
      const m = r[ix('demo_url')].match(/\/demos\/([^/]+)$/);
      if (!m) continue;
      leadBySlug.set(m[1], {
        brandName: r[ix('brand_name')],
        brandDomain: r[ix('brand_domain')],
        contactFirstName: r[ix('contact_first_name')],
        contactEmail: r[ix('contact_email')],
        status: r[ix('demo_status')],
      });
    }
  }
  // Map slug → sender_email from emails.csv
  const senderBySlug = new Map();
  if (fs.existsSync(EMAILS_CSV)) {
    const rows = parseCSV(fs.readFileSync(EMAILS_CSV, 'utf8'));
    const h = rows[0];
    const ix = (n) => h.findIndex(c => c === n);
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i]; if (!r || !r[ix('demo_url')]) continue;
      const m = r[ix('demo_url')].match(/\/demos\/([^/]+)$/);
      if (!m) continue;
      senderBySlug.set(m[1], r[ix('sender_email')]);
    }
  }
  // Scan manifests
  const entries = [];
  for (const f of fs.readdirSync(MANIFEST_DIR)) {
    if (!f.endsWith('.json') || f === 'index.json') continue;
    const data = JSON.parse(fs.readFileSync(path.join(MANIFEST_DIR, f), 'utf8'));
    const slug = data.slug;
    const lead = leadBySlug.get(slug) || {};
    entries.push({
      slug,
      brandName: data.brandName,
      brandDomain: data.brandDomain || lead.brandDomain || '',
      generatedOn: data.generatedOn,
      genderClassification: data.genderClassification,
      classificationConfidence: data.classificationConfidence,
      modelName: data.tryOns?.[0]?.modelName || '',
      productTitle: data.tryOns?.[0]?.title || '',
      contactFirstName: lead.contactFirstName || '',
      contactEmail: lead.contactEmail || '',
      senderEmail: senderBySlug.get(slug) || '',
      status: lead.status || 'complete',
      demoUrl: `/demos/${slug}`,
    });
  }
  entries.sort((a, b) => (b.generatedOn || '').localeCompare(a.generatedOn || '') || a.brandName.localeCompare(b.brandName));
  fs.writeFileSync(path.join(MANIFEST_DIR, 'index.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), count: entries.length, demos: entries }, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
