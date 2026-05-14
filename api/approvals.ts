/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * GET  /api/approvals          → { [slug]: 'approved' | 'rejected' | 'removed' }
 * POST /api/approvals          body { slug, state } — requires x-admin-token
 *
 * Persistence: Redis (REDIS_URL env var). Falls back to in-memory if Redis isn't
 * configured (warns on every request so the misconfiguration is loud).
 *
 * Approvals are merged on the client with the static public/demos-data/approvals.json
 * so any approval committed to the repo is always reflected, and Redis stores the
 * UI-side updates between commits.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';
import { verifyAdminToken, readAdminTokenFromHeaders } from './_adminAuth.js';

const REDIS_KEY = 'demo:approvals';
type ApprovalState = 'approved' | 'rejected' | 'removed';
const VALID_STATES: ApprovalState[] = ['approved', 'rejected', 'removed'];

let memoryStore: Record<string, ApprovalState> = {};
let redisClient: any = null;

async function getRedis() {
  if (redisClient && redisClient.isOpen) return redisClient;
  const url = process.env.REDIS_URL;
  if (!url) {
    console.warn('[approvals] REDIS_URL not configured — using in-memory store (NOT PERSISTENT across function invocations).');
    return null;
  }
  redisClient = createClient({
    url,
    socket: {
      reconnectStrategy: (retries) => retries > 3 ? new Error('Max reconnection attempts reached') : Math.min(retries * 100, 3000),
    },
  });
  redisClient.on('error', (err: any) => console.error('[approvals] Redis error:', err?.message || err));
  await redisClient.connect();
  return redisClient;
}

async function loadAll(): Promise<Record<string, ApprovalState>> {
  const client = await getRedis();
  if (!client) return { ...memoryStore };
  const raw = await client.get(REDIS_KEY);
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

async function saveAll(state: Record<string, ApprovalState>) {
  const client = await getRedis();
  if (!client) { memoryStore = { ...state }; return; }
  await client.set(REDIS_KEY, JSON.stringify(state));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-admin-token');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const approvals = await loadAll();
      return res.status(200).json(approvals);
    } catch (e: any) {
      console.error('[approvals] GET error:', e);
      return res.status(500).json({ error: e?.message || 'unknown' });
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
    const allowed = [...VALID_STATES, 'pending'] as string[];
    if (!allowed.includes(state as string)) {
      return res.status(400).json({ error: 'state must be approved, rejected, removed, or pending' });
    }

    try {
      const approvals = await loadAll();
      if (state === 'pending') delete approvals[slug];
      else approvals[slug] = state as ApprovalState;
      await saveAll(approvals);
      return res.status(200).json({ ok: true, state, slug });
    } catch (e: any) {
      console.error('[approvals] POST error:', e);
      return res.status(500).json({ error: e?.message || 'unknown' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
