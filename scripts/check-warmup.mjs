/**
 * Check Maildoso warmup activity by inspecting each mailbox's INBOX via IMAP.
 *
 * If Maildoso warmup is active, mailboxes will receive emails from other
 * Maildoso users (warmup pool) over time. We look at counts + a few recent
 * subjects per mailbox to confirm activity.
 *
 * Usage:  node --env-file=.env.local scripts/check-warmup.mjs
 */

import { ImapFlow } from 'imapflow';
import { MAILBOXES, getPassword } from './_mailboxes.mjs';

// IMAP host map by domain (from Maildoso accounts.csv)
const IMAP_HOSTS = {
  'renderedfits.shop':   'imap.heracles.maildoso.com',
  'renderedfits.store':  'imap.hermes.maildoso.com',
  'renderedfits.app':    'imap.hyperion.maildoso.com',
  'rendered-fits.com':   'imap.homer.maildoso.com',
  'renderedfits.uk':     'imap.homer.maildoso.com',
};

async function checkOne(mb) {
  const [, domain] = mb.address.split('@');
  const host = IMAP_HOSTS[domain];
  if (!host) return { address: mb.address, error: 'no IMAP host for domain' };
  const pw = getPassword(mb);
  if (!pw) return { address: mb.address, error: 'no password' };

  const client = new ImapFlow({
    host, port: 993, secure: true,
    auth: { user: mb.address, pass: pw },
    logger: false,
  });

  try {
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');
    let total, recent;
    let subjects = [];
    try {
      const status = await client.status('INBOX', { messages: true, recent: true });
      total = status.messages;
      recent = status.recent;
      // Get the latest 3 message subjects + sender to gauge whether they're warmup
      if (total > 0) {
        const range = `${Math.max(1, total - 2)}:${total}`;
        for await (const msg of client.fetch(range, { envelope: true })) {
          const env = msg.envelope || {};
          const from = (env.from?.[0]?.address) || '?';
          const subj = env.subject || '(no subject)';
          subjects.push({ from, subj: subj.slice(0, 70) });
        }
      }
    } finally {
      lock.release();
    }
    await client.logout();
    return { address: mb.address, total, recent, subjects };
  } catch (e) {
    try { await client.close(); } catch {}
    return { address: mb.address, error: e?.message || String(e) };
  }
}

async function main() {
  const maildoso = MAILBOXES.filter(m => m.provider === 'maildoso');
  console.log(`Checking INBOX of ${maildoso.length} Maildoso mailboxes (IMAP) ...\n`);
  const results = [];
  // Run sequentially to avoid hammering IMAP servers
  for (const mb of maildoso) {
    const r = await checkOne(mb);
    results.push(r);
    if (r.error) {
      console.log(`  ✗ ${r.address}  →  ${r.error}`);
    } else {
      const flag = r.total > 0 ? '✓' : '·';
      console.log(`  ${flag} ${r.address}  →  ${r.total} messages in INBOX`);
    }
  }
  // Summary
  const ok = results.filter(r => !r.error);
  const withMail = ok.filter(r => r.total > 0);
  console.log(`\nSummary:`);
  console.log(`  Reachable: ${ok.length}/${results.length}`);
  console.log(`  Have inbox mail (likely warmup): ${withMail.length}/${ok.length}`);
  if (withMail.length > 0) {
    console.log(`\nSample of recent inbox subjects (showing 1 mailbox with mail):`);
    const sample = withMail[0];
    console.log(`  ${sample.address}:`);
    for (const s of sample.subjects) console.log(`    from ${s.from}: ${s.subj}`);
  }
  if (withMail.length === 0) {
    console.log(`\n⚠ No mailbox has any inbox mail yet. Warmup may not have started,`);
    console.log(`  or Maildoso routes warmup to a folder other than INBOX.`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
