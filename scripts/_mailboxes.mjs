/**
 * Mailbox registry — single source of truth for all 23 mailboxes.
 *
 * For each mailbox we look up the password from an env var of the form:
 *   MAILDOSO_PASSWORD_<local>_<domain-with-underscores>
 *   GWS_PASSWORD_<local>_<domain-with-underscores>
 *
 * Example env var names (paste these into .env.local with real passwords):
 *   MAILDOSO_PASSWORD_mail_renderedfits_app=...
 *   MAILDOSO_PASSWORD_hello_renderedfits_app=...
 *   GWS_PASSWORD_mail_renderedfits_com=...
 *
 * Passwords are never logged.
 */

export const MAILDOSO_SMTP = {
  host: 'smtp.maildoso.com',
  port: 587,
  secure: false, // STARTTLS
  requireTLS: true,
};

export const GWS_SMTP = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
};

export const DISPLAY_NAME = 'Sydney Stones';
export const REPLY_TO_MAILDOSO = 'renderedfits@maildoso.email';

const MAILDOSO_DOMAINS = [
  'renderedfits.app',
  'renderedfits.shop',
  'rendered-fits.com',
  'renderedfits.store',
  'renderedfits.uk',
];
const MAILDOSO_LOCALS = ['mail', 'hello', 'sydney', 'info'];

const GWS_ADDRESSES = [
  'mail@renderedfits.com',
  'mail@getrenderedfits.com',
  'mail@tryrenderedfits.com',
];

function envKey(prefix, address) {
  const [local, domain] = address.split('@');
  return `${prefix}_${local}_${domain.replace(/[-.]/g, '_')}`;
}

function buildList() {
  const out = [];
  for (const d of MAILDOSO_DOMAINS) {
    for (const l of MAILDOSO_LOCALS) {
      const address = `${l}@${d}`;
      out.push({
        address,
        provider: 'maildoso',
        smtp: MAILDOSO_SMTP,
        envKey: envKey('MAILDOSO_PASSWORD', address),
        replyTo: REPLY_TO_MAILDOSO,
      });
    }
  }
  for (const address of GWS_ADDRESSES) {
    out.push({
      address,
      provider: 'gws',
      smtp: GWS_SMTP,
      envKey: envKey('GWS_PASSWORD', address),
      replyTo: address,
    });
  }
  return out;
}

export const MAILBOXES = buildList();
export const MAILDOSO_COUNT = MAILDOSO_DOMAINS.length * MAILDOSO_LOCALS.length;
export const GWS_COUNT = GWS_ADDRESSES.length;

export function getPassword(mailbox) {
  return process.env[mailbox.envKey] || '';
}

export function listExpectedEnvKeys() {
  return MAILBOXES.map(m => m.envKey);
}
