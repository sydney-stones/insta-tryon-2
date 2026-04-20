/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * POST /api/admin-login
 *
 * Body: { password: string }
 * Returns: { success: true, token: string }  — on success (HTTP 200)
 *          { error: string }                  — on failure (HTTP 400/401/500)
 *
 * The ADMIN_PASSWORD never leaves the server. The browser receives only a
 * short-lived signed token (see ./_adminAuth.ts) which it stores in
 * sessionStorage under the key `adminToken`.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { signAdminToken } from './_adminAuth.js';

// Small artificial delay on failures to soften timing attacks / casual brute force.
const FAILURE_DELAY_MS = 400;

function constantTimeEquals(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, 'utf8');
  const bBuf = Buffer.from(b, 'utf8');
  if (aBuf.length !== bBuf.length) {
    // Still do a compare to avoid length-based timing differences.
    crypto.timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res
      .status(500)
      .json({ error: 'Server not configured: missing ADMIN_PASSWORD' });
  }

  const { password } = (req.body ?? {}) as { password?: unknown };
  if (typeof password !== 'string' || password.length === 0) {
    return res.status(400).json({ error: 'password is required' });
  }

  if (!constantTimeEquals(password, adminPassword)) {
    await new Promise((r) => setTimeout(r, FAILURE_DELAY_MS));
    return res.status(401).json({ error: 'Incorrect password' });
  }

  let token: string;
  try {
    token = signAdminToken();
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: err?.message || 'Failed to issue token' });
  }

  return res.status(200).json({ success: true, token });
}
