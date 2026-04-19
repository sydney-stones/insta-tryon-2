/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Signed-token helpers for the admin gate.
 *
 * The admin login endpoint (`/api/admin-login`) mints HMAC-SHA256 signed
 * tokens after verifying the password. The token is stored in the browser's
 * sessionStorage and — if future admin-only endpoints are added — would be
 * checked on every request via `readAdminTokenFromHeaders` + `verifyAdminToken`.
 *
 * Today no endpoint actually requires the token because the admin dashboard
 * only performs client-side work (editing a localStorage wardrobe, viewing
 * public analytics). The infrastructure is kept so we don't have to roll
 * auth again the next time we add a real admin-only server action, and so
 * the ADMIN_PASSWORD is never shipped to the browser.
 */

import crypto from 'crypto';

const MIN_SECRET_LENGTH = 32;

function requireSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `ADMIN_SECRET must be set and at least ${MIN_SECRET_LENGTH} chars long`
    );
  }
  return secret;
}

function b64urlEncode(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function b64urlDecode(input: string): Buffer {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4));
  return Buffer.from(
    input.replace(/-/g, '+').replace(/_/g, '/') + pad,
    'base64'
  );
}

function sign(payload: string, secret: string): string {
  return b64urlEncode(
    crypto.createHmac('sha256', secret).update(payload).digest()
  );
}

export interface AdminTokenPayload {
  /** Issued-at (seconds since epoch). */
  iat: number;
  /** Expires-at (seconds since epoch). */
  exp: number;
  /** Role marker — always "admin" for now. */
  role: 'admin';
}

/** Mint a signed admin token with the given TTL (default 8 hours). */
export function signAdminToken(ttlSeconds: number = 28800): string {
  const secret = requireSecret();
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminTokenPayload = {
    iat: now,
    exp: now + ttlSeconds,
    role: 'admin',
  };
  const payloadB64 = b64urlEncode(JSON.stringify(payload));
  const signature = sign(payloadB64, secret);
  return `${payloadB64}.${signature}`;
}

/** Return the payload if valid + unexpired, else null. */
export function verifyAdminToken(token: unknown): AdminTokenPayload | null {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [payloadB64, signatureB64] = token.split('.', 2);
  if (!payloadB64 || !signatureB64) return null;

  const secret = requireSecret();
  const expected = sign(payloadB64, secret);

  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signatureB64, 'utf8');
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  let payload: AdminTokenPayload;
  try {
    payload = JSON.parse(b64urlDecode(payloadB64).toString('utf8'));
  } catch {
    return null;
  }

  if (payload.role !== 'admin') return null;
  const now = Math.floor(Date.now() / 1000);
  if (typeof payload.exp !== 'number' || payload.exp <= now) return null;

  return payload;
}

/** Pull the admin token out of an incoming request's headers, if present. */
export function readAdminTokenFromHeaders(
  headers: Record<string, string | string[] | undefined>
): string | null {
  const raw = headers['x-admin-token'];
  if (!raw) return null;
  return Array.isArray(raw) ? raw[0] ?? null : raw;
}
