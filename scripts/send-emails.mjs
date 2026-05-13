/**
 * Send-emails — unified SMTP send pipeline for all 23 mailboxes.
 *
 * Modes:
 *   --test                Send one email per Maildoso mailbox to TEST_RECIPIENT,
 *                         each using a different real demo URL + the E1 template.
 *                         Does NOT touch any lead from emails.csv. Marks first_send_date.
 *   --check               Print which env vars are missing and which mailboxes are ready.
 *                         No SMTP connections, no sends.
 *   --dry-run             Simulate a normal send batch using emails.csv but do not actually send.
 *   --live                Real production send batch (NOT IMPLEMENTED YET — gated behind
 *                         test approval, to be enabled in a follow-up commit).
 *
 * Test recipient: mail@renderedfits.com (override with TEST_RECIPIENT env var).
 *
 * Usage:
 *   node --env-file=.env.local scripts/send-emails.mjs --check
 *   node --env-file=.env.local scripts/send-emails.mjs --test
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

// ─── Entrypoint ─────────────────────────────────────────────────────────────
async function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has('--check')) return runCheck();
  if (args.has('--test'))  return runTest();
  if (args.has('--dry-run')) {
    console.log('--dry-run not implemented yet; will simulate emails.csv-driven sends in a follow-up.');
    return;
  }
  if (args.has('--live')) {
    console.log('--live is intentionally disabled. Run --test first and confirm before this is enabled.');
    process.exit(2);
  }
  console.log('Usage:');
  console.log('  node --env-file=.env.local scripts/send-emails.mjs --check');
  console.log('  node --env-file=.env.local scripts/send-emails.mjs --test');
}

main().catch(e => { console.error(e); process.exit(1); });
