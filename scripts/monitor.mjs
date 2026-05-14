/**
 * Local monitoring dashboard for the outreach send pipeline.
 *
 * Usage:  node --env-file=.env.local scripts/monitor.mjs
 *         → opens http://localhost:3030
 *
 * Shows in one screen:
 *   - Warmup status (IMAP inbox count per Maildoso mailbox)
 *   - Per-mailbox sent counts, daily cap, remaining quota, status
 *   - Recent outbound (last 30 from sends table)
 *   - Recent inbound mail subjects (warmup or replies) across all mailboxes
 *
 * Auto-refreshes every 30s.
 */

import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
import { ImapFlow } from 'imapflow';
import { MAILBOXES, getPassword } from './_mailboxes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'send-state.db');
const PORT = Number(process.env.MONITOR_PORT) || 3030;

const IMAP_HOSTS = {
  'renderedfits.shop':   'imap.heracles.maildoso.com',
  'renderedfits.store':  'imap.hermes.maildoso.com',
  'renderedfits.app':    'imap.hyperion.maildoso.com',
  'rendered-fits.com':   'imap.homer.maildoso.com',
  'renderedfits.uk':     'imap.homer.maildoso.com',
};

const RAMP_TIERS = [
  { maxDay: 3, cap: 3 }, { maxDay: 7, cap: 7 }, { maxDay: 14, cap: 15 },
  { maxDay: 21, cap: 30 }, { maxDay: 9999, cap: 50 },
];
const todayISO = () => new Date().toISOString().slice(0, 10);
function daysSince(dateStr) {
  if (!dateStr) return 0;
  const a = new Date(dateStr + 'T00:00:00Z').getTime();
  const b = new Date(todayISO() + 'T00:00:00Z').getTime();
  return Math.max(0, Math.round((b - a) / 86400000));
}
function rampCap(row, providerHint) {
  if ((row.provider || providerHint) === 'gws') return 50;
  if (!row.first_send_date) return RAMP_TIERS[0].cap;
  const days = daysSince(row.first_send_date);
  for (const t of RAMP_TIERS) if (days <= t.maxDay) return t.cap;
  return 50;
}

// Cache IMAP results for 60s so frequent dashboard refreshes don't hammer Maildoso
let imapCache = { ts: 0, data: null };
const IMAP_TTL_MS = 60_000;

async function pollMailboxImap(mb) {
  const [, domain] = mb.address.split('@');
  const host = IMAP_HOSTS[domain];
  if (!host) return { address: mb.address, error: 'no IMAP host' };
  const pw = getPassword(mb);
  if (!pw) return { address: mb.address, error: 'no password' };
  const client = new ImapFlow({ host, port: 993, secure: true, auth: { user: mb.address, pass: pw }, logger: false });
  try {
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');
    let inboxCount = 0, recent = [];
    try {
      const status = await client.status('INBOX', { messages: true });
      inboxCount = status.messages || 0;
      if (inboxCount > 0) {
        const range = `${Math.max(1, inboxCount - 4)}:${inboxCount}`;
        for await (const msg of client.fetch(range, { envelope: true })) {
          const env = msg.envelope || {};
          recent.push({
            from: env.from?.[0]?.address || '?',
            subject: (env.subject || '(no subject)').slice(0, 80),
            date: env.date?.toISOString?.() || '',
          });
        }
      }
    } finally { lock.release(); }
    await client.logout();
    return { address: mb.address, inboxCount, recent };
  } catch (e) {
    try { await client.close(); } catch {}
    return { address: mb.address, error: e?.message || String(e) };
  }
}

async function getImapStatus() {
  if (imapCache.data && Date.now() - imapCache.ts < IMAP_TTL_MS) return imapCache.data;
  const maildoso = MAILBOXES.filter(m => m.provider === 'maildoso');
  // Run in parallel (max 5 concurrent to be polite)
  const results = [];
  for (let i = 0; i < maildoso.length; i += 5) {
    const chunk = maildoso.slice(i, i + 5);
    const r = await Promise.all(chunk.map(pollMailboxImap));
    results.push(...r);
  }
  imapCache = { ts: Date.now(), data: results };
  return results;
}

function getSendStatus() {
  const db = new Database(DB_PATH, { readonly: true });
  const mailboxes = db.prepare(`SELECT * FROM mailboxes ORDER BY provider, address`).all();
  const today = todayISO();
  const enriched = mailboxes.map(m => {
    const cap = rampCap(m);
    const todayRow = db.prepare(`SELECT sent_count FROM daily_counts WHERE mailbox = ? AND date = ?`).get(m.address, today);
    const totalRow = db.prepare(`SELECT COUNT(*) AS c FROM sends WHERE mailbox = ? AND status = 'sent'`).get(m.address);
    return {
      ...m,
      cap,
      sent_today: todayRow ? todayRow.sent_count : 0,
      sent_total: totalRow.c,
      remaining: Math.max(0, cap - (todayRow ? todayRow.sent_count : 0)),
    };
  });
  const recent = db.prepare(`SELECT ts, mailbox, recipient, brand, demo_url, kind, status, smtp_code FROM sends ORDER BY id DESC LIMIT 30`).all();
  const failures24h = db.prepare(`SELECT COUNT(*) AS c FROM sends WHERE status = 'failed' AND ts > datetime('now', '-1 day')`).get().c;
  const sent24h = db.prepare(`SELECT COUNT(*) AS c FROM sends WHERE status = 'sent' AND ts > datetime('now', '-1 day')`).get().c;
  db.close();
  return { mailboxes: enriched, recent, failures24h, sent24h };
}

const HTML = `<!doctype html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Rendered Fits — Outreach Monitor</title>
<style>
  :root { --bg: #fafaf7; --card: #fff; --border: #e5e5e2; --text: #1a1a1a; --muted: #6b7280; --accent: #444833; --green: #059669; --red: #dc2626; --amber: #d97706; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); margin: 0; color: var(--text); }
  .wrap { max-width: 1400px; margin: 0 auto; padding: 24px; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin: 28px 0 12px; }
  .meta { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
  .banner { padding: 16px 20px; border-radius: 6px; margin-bottom: 20px; font-size: 14px; }
  .banner.bad { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
  .banner.good { background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; }
  .grid { display: grid; gap: 16px; }
  .cards { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 16px; }
  .card .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); }
  .card .value { font-size: 28px; font-weight: 600; margin-top: 4px; }
  .card .sub { font-size: 12px; color: var(--muted); margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; background: var(--card); font-size: 13px; }
  th { text-align: left; padding: 8px 12px; background: #f5f5f3; border-bottom: 1px solid var(--border); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); font-weight: 600; }
  td { padding: 8px 12px; border-bottom: 1px solid #f0f0ed; }
  tr:last-child td { border-bottom: none; }
  .pill { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 500; }
  .pill.active { background: #ecfdf5; color: var(--green); }
  .pill.paused { background: #fef3c7; color: var(--amber); }
  .pill.halted { background: #fef2f2; color: var(--red); }
  .pill.sent  { background: #ecfdf5; color: var(--green); }
  .pill.failed { background: #fef2f2; color: var(--red); }
  .pill.test  { background: #f3f4f6; color: var(--muted); }
  .num { font-variant-numeric: tabular-nums; }
  .truncate { max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .right { text-align: right; }
  .header-row { display: flex; align-items: center; justify-content: space-between; }
  button { background: var(--accent); color: white; border: none; padding: 8px 16px; border-radius: 4px; font-size: 13px; cursor: pointer; }
  button:hover { opacity: 0.9; }
  .refreshing { opacity: 0.5; }
  details { background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 16px; margin-bottom: 16px; }
  details summary { cursor: pointer; font-weight: 600; }
  .mailbox-mini { display: flex; align-items: center; gap: 10px; padding: 6px 0; font-size: 13px; border-bottom: 1px solid #f0f0ed; }
  .mailbox-mini:last-child { border-bottom: none; }
  .mailbox-mini .addr { font-family: ui-monospace, monospace; font-size: 12px; flex: 1; }
  .mailbox-mini .count { font-weight: 600; min-width: 30px; text-align: right; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="header-row">
      <div>
        <h1>Rendered Fits — Outreach Monitor</h1>
        <p class="meta">Last updated: <span id="updated">loading…</span> · auto-refresh every 30s</p>
      </div>
      <button onclick="refresh()">Refresh now</button>
    </div>
    <div id="body">Loading…</div>
  </div>

<script>
let lastData = null;

async function refresh() {
  document.getElementById('body').classList.add('refreshing');
  try {
    const r = await fetch('/api/status');
    const data = await r.json();
    lastData = data;
    render(data);
  } catch (e) {
    document.getElementById('body').innerHTML = '<div class="banner bad">Failed to load status: ' + e.message + '</div>';
  } finally {
    document.getElementById('body').classList.remove('refreshing');
    document.getElementById('updated').textContent = new Date().toLocaleString();
  }
}

function pill(state) { return '<span class="pill ' + state + '">' + state + '</span>'; }
function esc(s) { return String(s||'').replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c])); }

function render(d) {
  const m = d.mailboxes;
  const imap = d.imap || [];
  const warmupActive = imap.some(x => (x.inboxCount || 0) > 0);
  const sentToday = m.reduce((s, x) => s + (x.sent_today || 0), 0);
  const sentTotal = m.reduce((s, x) => s + (x.sent_total || 0), 0);
  const totalCap = m.filter(x => x.status === 'active').reduce((s, x) => s + x.cap, 0);
  const remaining = m.filter(x => x.status === 'active').reduce((s, x) => s + x.remaining, 0);
  const paused = m.filter(x => x.status !== 'active').length;
  const totalInbox = imap.reduce((s, x) => s + (x.inboxCount || 0), 0);

  let html = '';

  // Warmup banner
  if (warmupActive) {
    html += '<div class="banner good">✓ Warmup activity detected: ' + totalInbox + ' message(s) across ' + imap.filter(x => x.inboxCount > 0).length + ' mailbox(es).</div>';
  } else {
    html += '<div class="banner bad">⚠ Warmup NOT active. Zero inbound mail on any of the 20 Maildoso mailboxes. Cold-domain reputation will not build until warmup is running.</div>';
  }

  // Top-line cards
  html += '<div class="grid cards">';
  html += '<div class="card"><div class="label">Sent today</div><div class="value num">' + sentToday + '</div><div class="sub">of ' + totalCap + ' total daily cap</div></div>';
  html += '<div class="card"><div class="label">Sent (lifetime)</div><div class="value num">' + sentTotal + '</div></div>';
  html += '<div class="card"><div class="label">Remaining today</div><div class="value num">' + remaining + '</div></div>';
  html += '<div class="card"><div class="label">Sent (24h)</div><div class="value num">' + (d.sent24h || 0) + '</div><div class="sub">' + (d.failures24h || 0) + ' failures</div></div>';
  html += '<div class="card"><div class="label">Paused / halted</div><div class="value num">' + paused + '</div></div>';
  html += '<div class="card"><div class="label">Inbox messages</div><div class="value num">' + totalInbox + '</div><div class="sub">across all 20 mailboxes</div></div>';
  html += '</div>';

  // Mailbox table
  html += '<h2>Mailboxes (' + m.length + ')</h2>';
  html += '<table><thead><tr><th>Address</th><th>Provider</th><th>Status</th><th>First send</th><th class="right">Sent today</th><th class="right">Cap</th><th class="right">Remaining</th><th class="right">Lifetime</th><th class="right">Inbox</th></tr></thead><tbody>';
  for (const x of m) {
    const inboxMap = Object.fromEntries(imap.map(i => [i.address, i]));
    const inbox = inboxMap[x.address];
    const inboxCell = inbox ? (inbox.error ? '<span style="color:var(--red)">err</span>' : inbox.inboxCount) : '—';
    html += '<tr>'
      + '<td style="font-family:ui-monospace,monospace;font-size:12px;">' + esc(x.address) + '</td>'
      + '<td>' + esc(x.provider) + '</td>'
      + '<td>' + pill(x.status) + (x.pause_reason ? '<div class="sub" style="font-size:11px;color:var(--muted)">' + esc(x.pause_reason) + '</div>' : '') + '</td>'
      + '<td class="num">' + (x.first_send_date || '—') + '</td>'
      + '<td class="right num">' + (x.sent_today || 0) + '</td>'
      + '<td class="right num">' + x.cap + '</td>'
      + '<td class="right num">' + x.remaining + '</td>'
      + '<td class="right num">' + (x.sent_total || 0) + '</td>'
      + '<td class="right num">' + inboxCell + '</td>'
      + '</tr>';
  }
  html += '</tbody></table>';

  // Recent inbound (potential warmup or replies)
  const inboundMsgs = [];
  for (const i of imap) {
    if (i.recent && i.recent.length) {
      for (const msg of i.recent) {
        inboundMsgs.push({ mailbox: i.address, ...msg });
      }
    }
  }
  inboundMsgs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  html += '<h2>Recent inbound mail (warmup or replies)</h2>';
  if (inboundMsgs.length === 0) {
    html += '<div class="card" style="text-align:center;color:var(--muted)">No inbound mail in any mailbox yet.</div>';
  } else {
    html += '<table><thead><tr><th>Mailbox</th><th>From</th><th>Subject</th><th>Date</th></tr></thead><tbody>';
    for (const msg of inboundMsgs.slice(0, 30)) {
      html += '<tr>'
        + '<td style="font-family:ui-monospace,monospace;font-size:11px;">' + esc(msg.mailbox) + '</td>'
        + '<td class="truncate">' + esc(msg.from) + '</td>'
        + '<td class="truncate">' + esc(msg.subject) + '</td>'
        + '<td class="num">' + esc(msg.date || '') + '</td>'
        + '</tr>';
    }
    html += '</tbody></table>';
  }

  // Recent outbound
  html += '<h2>Recent outbound (last ' + (d.recent || []).length + ')</h2>';
  if (!d.recent || d.recent.length === 0) {
    html += '<div class="card" style="text-align:center;color:var(--muted)">No sends yet.</div>';
  } else {
    html += '<table><thead><tr><th>Time</th><th>From mailbox</th><th>To</th><th>Brand</th><th>Kind</th><th>Status</th></tr></thead><tbody>';
    for (const r of d.recent) {
      html += '<tr>'
        + '<td class="num">' + esc(r.ts) + '</td>'
        + '<td style="font-family:ui-monospace,monospace;font-size:11px;">' + esc(r.mailbox) + '</td>'
        + '<td class="truncate">' + esc(r.recipient) + '</td>'
        + '<td>' + esc(r.brand || '—') + '</td>'
        + '<td>' + pill(r.kind) + '</td>'
        + '<td>' + pill(r.status) + '</td>'
        + '</tr>';
    }
    html += '</tbody></table>';
  }

  document.getElementById('body').innerHTML = html;
}

refresh();
setInterval(refresh, 30000);
</script>
</body></html>`;

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/' || req.url === '/index.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(HTML);
      return;
    }
    if (req.url === '/api/status') {
      const sendStatus = getSendStatus();
      const imap = await getImapStatus().catch(e => {
        console.error('IMAP error:', e);
        return [];
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ...sendStatus, imap }));
      return;
    }
    res.writeHead(404); res.end('not found');
  } catch (e) {
    console.error(e);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: e.message }));
  }
});

server.listen(PORT, () => {
  console.log(`Outreach monitor running at http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop.`);
});
