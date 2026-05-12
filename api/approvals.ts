/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * GET  /api/approvals          — returns { [slug]: 'approved' | 'rejected' }
 * POST /api/approvals          — body { slug, state } — requires x-admin-token
 *
 * Approvals are stored in Vercel KV so both Sydney and Sienna see the same
 * state regardless of which device they're on.
 *
 * Requires: KV_REST_API_URL + KV_REST_API_TOKEN env vars (set via Vercel dashboard
 * → Storage → KV → connect to this project).
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';
import { verifyAdminToken, readAdminTokenFromHeaders } from './_adminAuth.js';

const KV_KEY = 'demo:approvals';
type ApprovalState = 'approved' | 'rejected';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-admin-token');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const approvals = (await kv.get<Record<string, ApprovalState>>(KV_KEY)) ?? {};
      return res.status(200).json(approvals);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'POST') {
    const token = readAdminTokenFromHeaders(req.headers as Record<string, string | string[] | undefined>);
    if (!token || !verifyAdminToken(token)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { slug, state } = (req.body ?? {}) as { slug?: unknown; state?: unknown };
    if (typeof slug !== 'string' || !slug) {
      return res.status(400).json({ error: 'slug required' });
    }
    if (!['approved', 'rejected', 'pending'].includes(state as string)) {
      return res.status(400).json({ error: 'state must be approved, rejected, or pending' });
    }

    try {
      const approvals = (await kv.get<Record<string, ApprovalState>>(KV_KEY)) ?? {};
      if (state === 'pending') delete approvals[slug];
      else approvals[slug] = state as ApprovalState;
      await kv.set(KV_KEY, approvals);
      return res.status(200).json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
