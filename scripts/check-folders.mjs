/**
 * Inspect all folders on one Maildoso mailbox to find where warmup mail lives.
 */
import { ImapFlow } from 'imapflow';
import { MAILBOXES, getPassword } from './_mailboxes.mjs';

const IMAP_HOSTS = {
  'renderedfits.shop':   'imap.heracles.maildoso.com',
  'renderedfits.store':  'imap.hermes.maildoso.com',
  'renderedfits.app':    'imap.hyperion.maildoso.com',
  'rendered-fits.com':   'imap.homer.maildoso.com',
  'renderedfits.uk':     'imap.homer.maildoso.com',
};

async function main() {
  // Check mail@renderedfits.app (one mailbox, all folders)
  const mb = MAILBOXES.find(m => m.address === 'mail@renderedfits.app');
  const [, domain] = mb.address.split('@');
  const host = IMAP_HOSTS[domain];
  const client = new ImapFlow({
    host, port: 993, secure: true,
    auth: { user: mb.address, pass: getPassword(mb) },
    logger: false,
  });
  await client.connect();
  console.log(`Folders on ${mb.address}:\n`);
  const list = await client.list();
  for (const f of list) {
    try {
      const s = await client.status(f.path, { messages: true, recent: true });
      console.log(`  ${f.path.padEnd(40)} ${String(s.messages || 0).padStart(6)} messages`);
    } catch (e) {
      console.log(`  ${f.path.padEnd(40)}  (cannot read: ${e.message})`);
    }
  }
  await client.logout();
}
main().catch(e => { console.error(e); process.exit(1); });
