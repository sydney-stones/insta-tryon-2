#!/usr/bin/env node
// Generates a macOS Configuration Profile (.mobileconfig) that installs all 20
// Maildoso mailboxes into Apple Mail in a single user action.
//
// Usage: node --env-file=.env.local scripts/build-mail-profile.mjs
// Output: scripts/RenderedFits-Mail.mobileconfig

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'RenderedFits-Mail.mobileconfig');
const ACCOUNTS_CSV = '/Users/sydneystones/Downloads/accounts.csv';
const DISPLAY_NAME = 'Sydney Stones';

function parseAccountsCsv() {
  const lines = fs.readFileSync(ACCOUNTS_CSV, 'utf8').split(/\r?\n/).filter(Boolean);
  const headers = lines[0].split(',');
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',');
    const row = {};
    headers.forEach((h, j) => { row[h.trim()] = (cells[j] || '').trim(); });
    if (!row.Email) continue;
    out.push({
      address: row.Email,
      imapHost: row['IMAP Host'],
      imapPort: Number(row['IMAP Port']) || 993,
      smtpHost: row['SMTP Host'],
      smtpPort: Number(row['SMTP Port']) || 587,
      password: row['IMAP Password'],
    });
  }
  return out;
}

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function uuid() {
  return crypto.randomUUID().toUpperCase();
}

function mailPayload(account) {
  const { address, imapHost, imapPort, smtpHost, smtpPort, password } = account;
  const payloadUUID = uuid();
  return `        <dict>
            <key>PayloadType</key><string>com.apple.mail.managed</string>
            <key>PayloadVersion</key><integer>1</integer>
            <key>PayloadIdentifier</key><string>com.renderedfits.mail.${address.replace(/[@.]/g, '-')}</string>
            <key>PayloadUUID</key><string>${payloadUUID}</string>
            <key>PayloadDisplayName</key><string>${xmlEscape(address)}</string>
            <key>PayloadOrganization</key><string>RenderedFits</string>
            <key>EmailAccountDescription</key><string>${xmlEscape(address)}</string>
            <key>EmailAccountName</key><string>${xmlEscape(DISPLAY_NAME)}</string>
            <key>EmailAccountType</key><string>EmailTypeIMAP</string>
            <key>EmailAddress</key><string>${xmlEscape(address)}</string>
            <key>IncomingMailServerAuthentication</key><string>EmailAuthPassword</string>
            <key>IncomingMailServerHostName</key><string>${imapHost}</string>
            <key>IncomingMailServerPortNumber</key><integer>${imapPort}</integer>
            <key>IncomingMailServerUseSSL</key><true/>
            <key>IncomingMailServerUsername</key><string>${xmlEscape(address)}</string>
            <key>IncomingPassword</key><string>${xmlEscape(password)}</string>
            <key>OutgoingMailServerAuthentication</key><string>EmailAuthPassword</string>
            <key>OutgoingMailServerHostName</key><string>${smtpHost}</string>
            <key>OutgoingMailServerPortNumber</key><integer>${smtpPort}</integer>
            <key>OutgoingMailServerUseSSL</key><false/>
            <key>OutgoingMailServerUsername</key><string>${xmlEscape(address)}</string>
            <key>OutgoingPassword</key><string>${xmlEscape(password)}</string>
            <key>OutgoingPasswordSameAsIncomingPassword</key><true/>
            <key>PreventAppSheet</key><false/>
            <key>SMIMEEnabled</key><false/>
            <key>disableMailRecentsSyncing</key><false/>
        </dict>`;
}

const accounts = parseAccountsCsv();
const payloads = accounts.map(mailPayload);
if (!payloads.length) { console.error('No accounts found in accounts.csv'); process.exit(1); }

const bundleUUID = uuid();
const profile = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
${payloads.join('\n')}
    </array>
    <key>PayloadDisplayName</key>
    <string>RenderedFits Mail Accounts (20 Maildoso)</string>
    <key>PayloadIdentifier</key>
    <string>com.renderedfits.mail.bundle.${bundleUUID}</string>
    <key>PayloadOrganization</key>
    <string>RenderedFits</string>
    <key>PayloadDescription</key>
    <string>Installs all 20 Maildoso outreach mailboxes into Apple Mail.</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${bundleUUID}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>PayloadRemovalDisallowed</key>
    <false/>
</dict>
</plist>
`;

fs.writeFileSync(OUT, profile);
console.log(`Wrote ${OUT}`);
console.log(`Mailboxes included: ${payloads.length}`);
