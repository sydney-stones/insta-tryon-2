#!/usr/bin/env node
// Generates ONE .mobileconfig file per Maildoso mailbox (avoids the bulk-install
// timeout that fails when Mail tries to verify 20 accounts at once).
// Output: scripts/profiles/<address>.mobileconfig

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'profiles');
const ACCOUNTS_CSV = '/Users/sydneystones/Downloads/accounts.csv';

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const f of fs.readdirSync(OUT_DIR)) fs.unlinkSync(path.join(OUT_DIR, f));

const lines = fs.readFileSync(ACCOUNTS_CSV, 'utf8').split(/\r?\n/).filter(Boolean);
const headers = lines[0].split(',');
const u = () => crypto.randomUUID().toUpperCase();
const x = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

let count = 0;
for (let i = 1; i < lines.length; i++) {
  const cells = lines[i].split(',');
  const row = {};
  headers.forEach((h, j) => { row[h.trim()] = (cells[j] || '').trim(); });
  if (!row.Email) continue;

  const address = row.Email;
  const imapHost = row['IMAP Host'];
  const imapPort = Number(row['IMAP Port']) || 993;
  const smtpHost = row['SMTP Host'];
  const smtpPort = Number(row['SMTP Port']) || 587;
  const password = row['IMAP Password'];

  const slug = address.replace(/[@.]/g, '-');
  const payloadUUID = u();
  const bundleUUID = u();

  const profile = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadType</key><string>com.apple.mail.managed</string>
            <key>PayloadVersion</key><integer>1</integer>
            <key>PayloadIdentifier</key><string>com.renderedfits.mail.${slug}</string>
            <key>PayloadUUID</key><string>${payloadUUID}</string>
            <key>PayloadDisplayName</key><string>${x(address)}</string>
            <key>EmailAccountDescription</key><string>${x(address)}</string>
            <key>EmailAccountName</key><string>Sydney Stones</string>
            <key>EmailAccountType</key><string>EmailTypeIMAP</string>
            <key>EmailAddress</key><string>${x(address)}</string>
            <key>IncomingMailServerAuthentication</key><string>EmailAuthPassword</string>
            <key>IncomingMailServerHostName</key><string>${imapHost}</string>
            <key>IncomingMailServerPortNumber</key><integer>${imapPort}</integer>
            <key>IncomingMailServerUseSSL</key><true/>
            <key>IncomingMailServerUsername</key><string>${x(address)}</string>
            <key>IncomingPassword</key><string>${x(password)}</string>
            <key>OutgoingMailServerAuthentication</key><string>EmailAuthPassword</string>
            <key>OutgoingMailServerHostName</key><string>${smtpHost}</string>
            <key>OutgoingMailServerPortNumber</key><integer>${smtpPort}</integer>
            <key>OutgoingMailServerUseSSL</key><false/>
            <key>OutgoingMailServerUsername</key><string>${x(address)}</string>
            <key>OutgoingPassword</key><string>${x(password)}</string>
            <key>OutgoingPasswordSameAsIncomingPassword</key><true/>
        </dict>
    </array>
    <key>PayloadDisplayName</key><string>${x(address)}</string>
    <key>PayloadIdentifier</key><string>com.renderedfits.mail.bundle.${slug}</string>
    <key>PayloadType</key><string>Configuration</string>
    <key>PayloadUUID</key><string>${bundleUUID}</string>
    <key>PayloadVersion</key><integer>1</integer>
</dict>
</plist>
`;
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.mobileconfig`), profile);
  count++;
}
console.log(`Wrote ${count} profiles to ${OUT_DIR}`);
