/**
 * Send-emails — unified SMTP send pipeline for all 23 mailboxes.
 *
 * Modes:
 *   --check               Print which env vars are missing / which mailboxes are ready.
 *   --test                Send 1 email per Maildoso mailbox to TEST_RECIPIENT.
 *   --status              Print today's per-mailbox cap, remaining quota, status.
 *   --live                Production T1 send loop. Dry-runs unless --confirm is passed.
 *
 * Flags for --live:
 *   --confirm             Actually send emails (otherwise dry-runs).
 *   --max=N               Stop after N emails this run (default 50).
 *   --ignore-window       Skip the 08:00-17:00 + weekday gate (useful for ad-hoc tests).
 *
 * Env:
 *   TEST_RECIPIENT        Override test target (default mail@renderedfits.com).
 *   SEND_MAX              Override --max default.
 *   SEND_TIMEZONE         Override recipient TZ for window check (default Europe/London).
 *
 * Usage:
 *   node --env-file=.env.local scripts/send-emails.mjs --check
 *   node --env-file=.env.local scripts/send-emails.mjs --test
 *   node --env-file=.env.local scripts/send-emails.mjs --status
 *   node --env-file=.env.local scripts/send-emails.mjs --live
 *   node --env-file=.env.local scripts/send-emails.mjs --live --confirm --max=5
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import Database from 'better-sqlite3';

import {
  MAILBOXES, MAILDOSO_COUNT, GWS_COUNT,
  DISPLAY_NAME, getPassword, listExpectedEnvKeys,
} from './_mailboxes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DB_PATH = path.join(__dirname, 'send-state.db');
const OUTBOX_CSV = path.join(__dirname, 'outbox.csv');
const EMAILS_CSV = path.join(__dirname, 'emails.csv');
const TEST_RECIPIENT = process.env.TEST_RECIPIENT || 'mail@renderedfits.com';
const TEST_FIRST_NAME = 'Sienna';

// ─── E1 template ────────────────────────────────────────────────────────────
const E1_TEMPLATE = ({ firstName, brand, demoUrl }) => ({
  subject: `Rendered Fits × ${brand}`,
  body:
`Hi ${firstName},

Virtual try-on is rapidly reshaping the online shopping experience. Rendered Fits is a leading Shopify virtual try-on app, allowing customers to visualise garments on themselves before purchasing.

I've attached a custom demo below showcasing how our technology works using ${brand}'s products.

${demoUrl}

Brands using virtual try-on typically see ~20% fewer returns and a 30%+ uplift in conversion and AOV.

We'd love to hear your thoughts on the demo we've prepared for you.

Best,
Sienna`,
});

// ─── SQLite schema ──────────────────────────────────────────────────────────
function initDb() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS mailboxes (
      address TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      first_send_date TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      pause_reason TEXT,
      consecutive_failures INTEGER NOT NULL DEFAULT 0,
      last_used_at TEXT
    );
    CREATE TABLE IF NOT EXISTS sends (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ts TEXT NOT NULL,
      mailbox TEXT NOT NULL,
      recipient TEXT NOT NULL,
      brand TEXT,
      demo_url TEXT,
      touch_n INTEGER NOT NULL DEFAULT 1,
      kind TEXT NOT NULL DEFAULT 'production',
      smtp_code TEXT,
      status TEXT NOT NULL,
      retry_count INTEGER NOT NULL DEFAULT 0,
      error_message TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_sends_recipient_ts ON sends(recipient, ts);
    CREATE INDEX IF NOT EXISTS idx_sends_mailbox_ts ON sends(mailbox, ts);
    CREATE TABLE IF NOT EXISTS daily_counts (
      mailbox TEXT NOT NULL,
      date TEXT NOT NULL,
      sent_count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (mailbox, date)
    );
    CREATE TABLE IF NOT EXISTS bounces (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipient TEXT NOT NULL,
      hard_or_soft TEXT NOT NULL,
      mailbox TEXT NOT NULL,
      ts TEXT NOT NULL,
      response TEXT
    );
  `);
  // Seed mailboxes table from registry
  const upsert = db.prepare(`
    INSERT INTO mailboxes (address, provider, status)
    VALUES (?, ?, 'active')
    ON CONFLICT(address) DO UPDATE SET provider = excluded.provider
  `);
  const insertMany = db.transaction((rows) => { for (const r of rows) upsert.run(r.address, r.provider); });
  insertMany(MAILBOXES);
  return db;
}

// ─── Helpers ────────────────────────────────────────────────────────────────
const todayISO = () => new Date().toISOString().slice(0, 10);
const nowISO = () => new Date().toISOString();

function csvEscape(v) {
  const s = String(v ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function appendOutbox(row) {
  const header = 'ts,mailbox,recipient,brand,demo_url,touch_n,kind,status,smtp_code\n';
  if (!fs.existsSync(OUTBOX_CSV)) fs.writeFileSync(OUTBOX_CSV, header);
  const line = [
    row.ts, row.mailbox, row.recipient, row.brand || '', row.demo_url || '',
    row.touch_n, row.kind, row.status, row.smtp_code || '',
  ].map(csvEscape).join(',') + '\n';
  fs.appendFileSync(OUTBOX_CSV, line);
}

function recordSend(db, row) {
  db.prepare(`
    INSERT INTO sends (ts, mailbox, recipient, brand, demo_url, touch_n, kind, smtp_code, status, error_message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(row.ts, row.mailbox, row.recipient, row.brand ?? null, row.demo_url ?? null,
         row.touch_n, row.kind, row.smtp_code ?? null, row.status, row.error_message ?? null);
  if (row.status === 'sent') {
    db.prepare(`
      INSERT INTO daily_counts (mailbox, date, sent_count) VALUES (?, ?, 1)
      ON CONFLICT(mailbox, date) DO UPDATE SET sent_count = sent_count + 1
    `).run(row.mailbox, row.ts.slice(0, 10));
    db.prepare(`UPDATE mailboxes SET last_used_at = ?, consecutive_failures = 0 WHERE address = ?`)
      .run(row.ts, row.mailbox);
    // Set first_send_date on first successful send
    db.prepare(`UPDATE mailboxes SET first_send_date = COALESCE(first_send_date, ?) WHERE address = ?`)
      .run(row.ts.slice(0, 10), row.mailbox);
  }
}

function makeTransport(mailbox) {
  const password = getPassword(mailbox);
  if (!password) throw new Error(`missing env var ${mailbox.envKey}`);
  return nodemailer.createTransport({
    ...mailbox.smtp,
    auth: { user: mailbox.address, pass: password },
  });
}

async function sendOne(mailbox, { to, subject, text, replyTo }) {
  const transporter = makeTransport(mailbox);
  // Verify connection first (catches auth issues without sending)
  await transporter.verify();
  const info = await transporter.sendMail({
    from: { name: DISPLAY_NAME, address: mailbox.address },
    to,
    subject,
    text,
    replyTo: replyTo || mailbox.replyTo,
    headers: { 'X-Mailer': 'rendered-fits-sender/1' },
  });
  return { messageId: info.messageId, response: info.response, accepted: info.accepted, rejected: info.rejected };
}

// ─── --check mode ───────────────────────────────────────────────────────────
function runCheck() {
  console.log(`Registered mailboxes: ${MAILBOXES.length} (Maildoso ${MAILDOSO_COUNT} + GWS ${GWS_COUNT})\n`);
  const ready = [];
  const missing = [];
  for (const m of MAILBOXES) {
    if (getPassword(m)) ready.push(m);
    else missing.push(m);
  }
  console.log(`Ready (password present): ${ready.length}`);
  for (const m of ready) console.log(`  ✓ ${m.address}`);
  console.log(`\nMissing password (set env var):  ${missing.length}`);
  for (const m of missing) console.log(`  ✗ ${m.address}   →   set ${m.envKey} in .env.local`);
  if (missing.length === 0) console.log('\nAll mailboxes have passwords. Ready for --test.');
}

// ─── --test mode: 1 email per Maildoso mailbox to TEST_RECIPIENT ────────────
async function loadTestDemos(count) {
  // Pick `count` approved demos at random from public/demos-data
  const dataDir = path.join(ROOT, 'public', 'demos-data');
  const approvals = JSON.parse(fs.readFileSync(path.join(dataDir, 'approvals.json'), 'utf8'));
  const approvedSlugs = Object.keys(approvals).filter(s => approvals[s] === 'approved');
  // Sample without replacement
  const sample = [...approvedSlugs].sort(() => Math.random() - 0.5).slice(0, count);
  return sample.map(slug => {
    const m = JSON.parse(fs.readFileSync(path.join(dataDir, `${slug}.json`), 'utf8'));
    return { slug, brand: m.brandName, demoUrl: `https://renderedfits.com/demos/${slug}` };
  });
}

async function runTest() {
  const db = initDb();
  const maildoso = MAILBOXES.filter(m => m.provider === 'maildoso');
  const missing = maildoso.filter(m => !getPassword(m));
  if (missing.length > 0) {
    console.error(`Cannot run --test: ${missing.length} Maildoso mailboxes are missing passwords.`);
    console.error('Run with --check to see which env vars need setting in .env.local.');
    process.exit(1);
  }

  const demos = await loadTestDemos(maildoso.length);
  if (demos.length < maildoso.length) {
    console.error(`Need at least ${maildoso.length} approved demos for the test; only ${demos.length} approved.`);
    process.exit(1);
  }

  console.log(`Sending ${maildoso.length} test emails to ${TEST_RECIPIENT}\n`);
  let ok = 0, fail = 0;
  for (let i = 0; i < maildoso.length; i++) {
    const mb = maildoso[i];
    const demo = demos[i];
    const { subject, body } = E1_TEMPLATE({ firstName: TEST_FIRST_NAME, brand: demo.brand, demoUrl: demo.demoUrl });
    // Prepend a small marker so Sydney can quickly identify which mailbox sent which
    const taggedSubject = `[TEST ${i+1}/${maildoso.length} via ${mb.address}] ${subject}`;
    const ts = nowISO();
    try {
      const r = await sendOne(mb, { to: TEST_RECIPIENT, subject: taggedSubject, text: body });
      console.log(`  ✓ ${mb.address}  →  ${TEST_RECIPIENT}  (${demo.brand})`);
      recordSend(db, {
        ts, mailbox: mb.address, recipient: TEST_RECIPIENT,
        brand: demo.brand, demo_url: demo.demoUrl,
        touch_n: 0, kind: 'test', smtp_code: '250', status: 'sent',
      });
      appendOutbox({ ts, mailbox: mb.address, recipient: TEST_RECIPIENT, brand: demo.brand,
                     demo_url: demo.demoUrl, touch_n: 0, kind: 'test', status: 'sent', smtp_code: '250' });
      ok++;
    } catch (e) {
      const msg = (e && e.message) || String(e);
      const code = (e && (e.responseCode || e.code)) || '';
      console.error(`  ✗ ${mb.address}  →  FAILED  (${msg})`);
      recordSend(db, {
        ts, mailbox: mb.address, recipient: TEST_RECIPIENT,
        brand: demo.brand, demo_url: demo.demoUrl,
        touch_n: 0, kind: 'test', smtp_code: String(code), status: 'failed', error_message: msg,
      });
      appendOutbox({ ts, mailbox: mb.address, recipient: TEST_RECIPIENT, brand: demo.brand,
                     demo_url: demo.demoUrl, touch_n: 0, kind: 'test', status: 'failed', smtp_code: String(code) });
      db.prepare(`UPDATE mailboxes SET consecutive_failures = consecutive_failures + 1 WHERE address = ?`).run(mb.address);
      fail++;
    }
    // Small spacing between sends to avoid overwhelming the SMTP server
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log(`\nDone. Sent: ${ok}  Failed: ${fail}`);
  console.log(`Log: ${OUTBOX_CSV}`);
  console.log(`State: ${DB_PATH}`);
  db.close();
}

// ─── Ramp + mailbox picker ──────────────────────────────────────────────────
const RAMP_TIERS = [
  { maxDay: 3,    cap: 3  },
  { maxDay: 7,    cap: 7  },
  { maxDay: 14,   cap: 15 },
  { maxDay: 21,   cap: 30 },
  { maxDay: 9999, cap: 50 },
];

function daysSince(dateStr) {
  if (!dateStr) return 0;
  const a = new Date(dateStr + 'T00:00:00Z').getTime();
  const b = new Date(todayISO() + 'T00:00:00Z').getTime();
  return Math.max(0, Math.round((b - a) / 86400000));
}

function rampCap(mailboxRow, providerHint) {
  // GWS mailboxes are pre-warmed → flat 50/day from day 1.
  if ((mailboxRow.provider || providerHint) === 'gws') return 50;
  if (!mailboxRow.first_send_date) return RAMP_TIERS[0].cap; // pre-first-send → tier 1
  const days = daysSince(mailboxRow.first_send_date);
  for (const t of RAMP_TIERS) if (days <= t.maxDay) return t.cap;
  return 50;
}

function rampGateOk(db, mailbox) {
  // Block tier progression unless the last 3 days had bounce rate < 2%.
  // For initial days, always OK.
  const days = db.prepare(`
    SELECT date,
      (SELECT COUNT(*) FROM sends s WHERE s.mailbox = ? AND s.ts LIKE date || '%' AND s.status = 'sent') AS sent,
      (SELECT COUNT(*) FROM bounces b WHERE b.mailbox = ? AND b.ts LIKE date || '%') AS bounced
    FROM daily_counts WHERE mailbox = ? ORDER BY date DESC LIMIT 3
  `).all(mailbox, mailbox, mailbox);
  if (days.length < 3) return true;
  for (const d of days) {
    if (d.sent > 0 && (d.bounced / d.sent) >= 0.02) return false;
  }
  return true;
}

function getMailboxRow(db, address) {
  return db.prepare(`SELECT * FROM mailboxes WHERE address = ?`).get(address);
}

function todayCount(db, address) {
  const r = db.prepare(`SELECT sent_count FROM daily_counts WHERE mailbox = ? AND date = ?`)
              .get(address, todayISO());
  return r ? r.sent_count : 0;
}

function pickMailbox(db) {
  // Only Maildoso + GWS mailboxes that are active AND have remaining quota.
  // Pick the one with the highest remaining quota; break ties by least-recently-used.
  const candidates = [];
  for (const m of MAILBOXES) {
    if (!getPassword(m)) continue;
    const row = getMailboxRow(db, m.address);
    if (!row || row.status !== 'active') continue;
    const cap = rampCap(row, m.provider);
    const used = todayCount(db, m.address);
    const remaining = cap - used;
    if (remaining <= 0) continue;
    candidates.push({ mailbox: m, row, remaining, lastUsed: row.last_used_at || '' });
  }
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.remaining - a.remaining || a.lastUsed.localeCompare(b.lastUsed));
  return candidates[0].mailbox;
}

// ─── Send error handling ────────────────────────────────────────────────────
function handleSendError(db, mb, item, code, msg, ts) {
  const isAuth = code === '535' || /auth/i.test(msg);
  const isHardBounce = /^5\d\d$/.test(code) && !isAuth;
  const isSoft = /^4\d\d$/.test(code);
  const bounceKind = isHardBounce ? 'hard' : (isSoft ? 'soft' : 'other');

  console.error(`  ✗ ${mb.address} → ${item.recipient}  [${code}] ${msg}`);

  recordSend(db, {
    ts, mailbox: mb.address, recipient: item.recipient,
    brand: item.brand, demo_url: item.demoUrl,
    touch_n: 1, kind: 'production', smtp_code: code, status: 'failed', error_message: msg,
  });
  appendOutbox({ ts, mailbox: mb.address, recipient: item.recipient, brand: item.brand,
                 demo_url: item.demoUrl, touch_n: 1, kind: 'production', status: 'failed', smtp_code: code });

  db.prepare(`INSERT INTO bounces (recipient, hard_or_soft, mailbox, ts, response) VALUES (?, ?, ?, ?, ?)`)
    .run(item.recipient, bounceKind, mb.address, ts, msg);

  if (isAuth) {
    db.prepare(`UPDATE mailboxes SET status = 'halted', pause_reason = ? WHERE address = ?`)
      .run('SMTP 535 auth failure — check credentials', mb.address);
    console.error(`  ⚠ ${mb.address} HALTED (auth failure)`);
    return;
  }
  if (isHardBounce) {
    db.prepare(`UPDATE mailboxes SET consecutive_failures = consecutive_failures + 1 WHERE address = ?`).run(mb.address);
    const row = getMailboxRow(db, mb.address);
    if (row.consecutive_failures >= 3) {
      db.prepare(`UPDATE mailboxes SET status = 'paused', pause_reason = ? WHERE address = ?`)
        .run('3 consecutive hard failures', mb.address);
      console.error(`  ⚠ ${mb.address} PAUSED (3 consecutive hard failures)`);
    }
  }

  // 24h bounce rate check
  const stats = db.prepare(`
    SELECT
      (SELECT COUNT(*) FROM sends WHERE mailbox = ? AND ts > datetime('now', '-1 day') AND status = 'sent') AS sent24,
      (SELECT COUNT(*) FROM bounces WHERE mailbox = ? AND ts > datetime('now', '-1 day')) AS bounce24
  `).get(mb.address, mb.address);
  if (stats.sent24 >= 20 && (stats.bounce24 / stats.sent24) > 0.05) {
    db.prepare(`UPDATE mailboxes SET status = 'paused', pause_reason = ? WHERE address = ?`)
      .run(`24h bounce rate ${(stats.bounce24 / stats.sent24 * 100).toFixed(1)}%`, mb.address);
    console.error(`  ⚠ ${mb.address} PAUSED (24h bounce rate >5%)`);
  }
}

// ─── CSV parser (tolerant of quoted fields) ─────────────────────────────────
function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i+1] === '"') { cell += '"'; i++; }
        else inQ = false;
      } else cell += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') { row.push(cell); cell = ''; }
      else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
      else if (c === '\r') {} // skip
      else cell += c;
    }
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

// ─── Window check ───────────────────────────────────────────────────────────
function withinSendWindow() {
  const tz = process.env.SEND_TIMEZONE || 'Europe/London';
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, weekday: 'short', hour: '2-digit', hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(new Date()).map(p => [p.type, p.value]));
  const weekday = parts.weekday; // Mon..Sun
  const hour = parseInt(parts.hour, 10);
  const isWeekend = weekday === 'Sat' || weekday === 'Sun';
  const inHours = hour >= 8 && hour < 17;
  return { ok: !isWeekend && inHours, weekday, hour, tz };
}

// ─── --status mode ──────────────────────────────────────────────────────────
function runStatus() {
  const db = initDb();
  const today = todayISO();
  const w = withinSendWindow();
  console.log(`Today: ${today}  (window OK: ${w.ok}, ${w.weekday} ${w.hour}h ${w.tz})\n`);
  const rows = db.prepare(`SELECT * FROM mailboxes ORDER BY provider, address`).all();
  console.log('mailbox                                        provider  status   first-send   sent-today  cap  remaining  pause-reason');
  console.log('-----------------------------------------------------------------------------------------------------------------------');
  for (const r of rows) {
    const cap = rampCap(r);
    const used = todayCount(db, r.address);
    const remaining = Math.max(0, cap - used);
    const fs = (r.first_send_date || '—').padEnd(10);
    const status = (r.status || '').padEnd(7);
    const provider = (r.provider || '').padEnd(8);
    const addr = r.address.padEnd(45);
    console.log(`${addr}  ${provider}  ${status}  ${fs}   ${String(used).padStart(10)}  ${String(cap).padStart(3)}  ${String(remaining).padStart(9)}  ${r.pause_reason || ''}`);
  }
  db.close();
}

// ─── --live (production T1 send loop) ───────────────────────────────────────
async function runLive() {
  const args = new Set(process.argv.slice(2));
  const dryRun = !args.has('--confirm');
  const ignoreWindow = args.has('--ignore-window');
  const maxArg = process.argv.find(a => a.startsWith('--max='));
  const maxToSend = Number(process.env.SEND_MAX) || (maxArg ? Number(maxArg.split('=')[1]) : 50);

  const db = initDb();

  // 1. Window gate
  const w = withinSendWindow();
  if (!w.ok && !ignoreWindow) {
    console.log(`Outside send window (08:00-17:00 weekdays in ${w.tz}). Now: ${w.weekday} ${w.hour}h.`);
    console.log('Use --ignore-window to override.');
    db.close();
    return;
  }

  // 2. Load queue from emails.csv
  if (!fs.existsSync(EMAILS_CSV)) {
    console.error('emails.csv not found — run the demo generator first.');
    db.close();
    return;
  }
  const rows = parseCSV(fs.readFileSync(EMAILS_CSV, 'utf8'));
  const header = rows[0];
  const ix = (n) => header.indexOf(n);

  // Load static approvals from repo + live approvals from production Redis (via API)
  // so removals/rejections done in the admin UI are honoured immediately.
  const staticApprovals = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', 'demos-data', 'approvals.json'), 'utf8'));
  let liveApprovals = {};
  try {
    const r = await fetch('https://renderedfits.com/api/approvals');
    if (r.ok) liveApprovals = await r.json();
  } catch (e) {
    console.warn('Could not fetch live approvals from API; using static file only.');
  }
  const approvals = { ...staticApprovals, ...liveApprovals };

  const queue = [];
  let skipNotApproved = 0, skipDedup = 0, skipNoRecipient = 0;
  const seenRecipients = new Set();
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r || r.length < 5) continue;
    const recipient = (r[ix('contact_email')] || '').trim().toLowerCase();
    const demoUrl = r[ix('demo_url')];
    if (!recipient || !recipient.includes('@')) { skipNoRecipient++; continue; }
    const m = (demoUrl || '').match(/\/demos\/([^/]+)$/);
    const slug = m ? m[1] : null;
    if (!slug || approvals[slug] !== 'approved') { skipNotApproved++; continue; }

    // 30-day dedup check
    const recent = db.prepare(
      `SELECT 1 FROM sends WHERE recipient = ? AND status = 'sent' AND ts > datetime('now', '-30 days') LIMIT 1`
    ).get(recipient);
    if (recent) { skipDedup++; continue; }
    if (seenRecipients.has(recipient)) { skipDedup++; continue; } // dedup within this run
    seenRecipients.add(recipient);

    queue.push({
      slug,
      brand: r[ix('brand_name')] || '',
      firstName: r[ix('contact_first_name')] || 'there',
      recipient,
      demoUrl,
    });
  }

  console.log(`Queue: ${queue.length} eligible`);
  console.log(`  skipped (not approved): ${skipNotApproved}`);
  console.log(`  skipped (already sent / dup): ${skipDedup}`);
  console.log(`  skipped (no recipient): ${skipNoRecipient}`);
  console.log(`Mode: ${dryRun ? 'DRY-RUN (no actual sends; add --confirm to send)' : 'LIVE (real sends)'}`);
  console.log(`Max this run: ${maxToSend}\n`);

  if (queue.length === 0) { db.close(); return; }

  let sent = 0, failed = 0;
  for (let qi = 0; qi < queue.length; qi++) {
    if (sent >= maxToSend) {
      console.log(`Reached max=${maxToSend}, stopping.`);
      break;
    }
    const item = queue[qi];
    const mb = pickMailbox(db);
    if (!mb) {
      console.log('No mailboxes available (all paused or at daily cap). Stopping.');
      break;
    }
    // Ramp gate: only block tier progression for Maildoso mailboxes
    if (mb.provider === 'maildoso' && !rampGateOk(db, mb.address)) {
      console.log(`  ⚠ ${mb.address}: ramp gate held (bounce rate ≥2% in last 3 days)`);
    }

    const { subject, body } = E1_TEMPLATE({
      firstName: item.firstName,
      brand: item.brand,
      demoUrl: item.demoUrl,
    });
    const ts = nowISO();

    if (dryRun) {
      console.log(`  [DRY] ${mb.address}  →  ${item.recipient}  (${item.brand})`);
      sent++;
      continue;
    }

    try {
      const transporter = makeTransport(mb);
      await transporter.verify();
      await transporter.sendMail({
        from: { name: DISPLAY_NAME, address: mb.address },
        to: item.recipient,
        subject,
        text: body,
        replyTo: mb.replyTo,
        headers: {
          'List-Unsubscribe': '<mailto:renderedfits@maildoso.email?subject=Unsubscribe>',
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      });
      console.log(`  ✓ ${mb.address}  →  ${item.recipient}  (${item.brand})`);
      recordSend(db, {
        ts, mailbox: mb.address, recipient: item.recipient,
        brand: item.brand, demo_url: item.demoUrl,
        touch_n: 1, kind: 'production', smtp_code: '250', status: 'sent',
      });
      appendOutbox({ ts, mailbox: mb.address, recipient: item.recipient, brand: item.brand,
                     demo_url: item.demoUrl, touch_n: 1, kind: 'production', status: 'sent', smtp_code: '250' });
      sent++;
    } catch (e) {
      const code = String(e?.responseCode ?? e?.code ?? '');
      handleSendError(db, mb, item, code, e?.message || String(e), ts);
      failed++;
    }

    // Jitter 60-240s between sends (skip on last one)
    const moreToGo = sent < maxToSend && qi < queue.length - 1;
    if (moreToGo && !dryRun) {
      const delayMs = (60 + Math.random() * 180) * 1000;
      console.log(`  ⋯ waiting ${Math.round(delayMs/1000)}s …`);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }

  console.log(`\nDone. Sent: ${sent}  Failed: ${failed}  Mode: ${dryRun ? 'dry-run' : 'live'}`);
  if (!dryRun) console.log(`Log: ${OUTBOX_CSV}`);
  db.close();
}

// ─── Entrypoint ─────────────────────────────────────────────────────────────
async function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has('--check'))  return runCheck();
  if (args.has('--test'))   return runTest();
  if (args.has('--status')) return runStatus();
  if (args.has('--live'))   return runLive();
  console.log('Usage:');
  console.log('  --check               verify env / mailbox readiness');
  console.log('  --test                fire 1 email per Maildoso mailbox to TEST_RECIPIENT');
  console.log('  --status              show per-mailbox cap/remaining/status');
  console.log('  --live                production T1 loop (DRY-RUN unless --confirm)');
  console.log('  --live --confirm      actually send');
  console.log('  --live --max=N        limit to N this run (default 50)');
}

main().catch(e => { console.error(e); process.exit(1); });
