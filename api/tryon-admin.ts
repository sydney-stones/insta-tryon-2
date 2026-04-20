/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * POST /api/tryon-admin
 *
 * Admin-only endpoint for generating custom try-on imagery.
 * Used internally to produce personalised try-on assets for cold email outreach.
 *
 * Auth:
 *   Requires a valid admin signed token in the `x-admin-token` header.
 *   The token is issued by /api/admin-login after a correct ADMIN_PASSWORD.
 *
 * Request body (JSON):
 *   {
 *     faceImage:       "data:image/jpeg;base64,..."   (required)
 *     bodyImage:       "data:image/jpeg;base64,..."   (required)
 *     garmentImages:   ["data:image/...;base64,...", ...]  (required, 1-6 items)
 *     prompt:          string                         (required, <= 4000 chars)
 *     resolution:      "1024x1024" | "1024x1536" | "1536x1024"   (optional)
 *   }
 *
 * Response:
 *   200  { image: "data:image/png;base64,..." , mimeType: "image/png" }
 *   400  { error: <validation message> }
 *   401  { error: "Unauthorized" }
 *   413  { error: "Payload too large" }
 *   429  { error: "Rate limit exceeded" }
 *   500  { error: "Server not configured: ..." }   // env var missing
 *   502  { error: "Upstream AI provider error" }
 *
 * Security notes:
 *   - GEMINI_ADMIN_API_KEY is server-side only. Never bundle it into the browser.
 *   - The key is read on every request from process.env; never logged or echoed.
 *   - This endpoint is the ONLY place the admin Gemini key is used.
 *   - Rate limit: MAX_REQUESTS_PER_MINUTE per admin token (Redis-backed, fails open).
 *   - Input images capped at MAX_IMAGE_BYTES post-base64-decode.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  verifyAdminToken,
  readAdminTokenFromHeaders,
} from './_adminAuth';

// ─── Tunables ────────────────────────────────────────────────────────────────
const DEFAULT_MODEL = 'gemini-3.1-flash-image';
const MAX_IMAGE_BYTES = 6 * 1024 * 1024;      // 6MB per image after base64 decode
const MAX_GARMENTS = 6;
const MAX_PROMPT_CHARS = 4000;
const MAX_REQUESTS_PER_MINUTE = 20;
const ALLOWED_MIME = /^image\/(jpeg|png|webp)$/;
const ALLOWED_RESOLUTIONS = new Set([
  '1024x1024',
  '1024x1536',
  '1536x1024',
  '2048x2048',
]);
// ────────────────────────────────────────────────────────────────────────────

interface DecodedImage {
  mimeType: string;
  data: string; // raw base64, no data URL prefix
  bytes: number;
}

function decodeDataUrl(value: unknown, label: string): DecodedImage {
  if (typeof value !== 'string' || !value.startsWith('data:')) {
    throw new ValidationError(`${label} must be a data URL`);
  }
  const match = value.match(/^data:([^;,]+)(?:;[^,]*)?,(.*)$/);
  if (!match) throw new ValidationError(`${label} has malformed data URL`);
  const [, mimeType, payload] = match;
  if (!ALLOWED_MIME.test(mimeType)) {
    throw new ValidationError(
      `${label} must be image/jpeg, image/png, or image/webp (got ${mimeType})`
    );
  }
  const base64 = payload.includes(';base64,')
    ? payload.split(';base64,').pop() || ''
    : payload;
  // Size check before even trying to decode.
  const approxBytes = Math.floor(base64.length * 0.75);
  if (approxBytes > MAX_IMAGE_BYTES) {
    throw new PayloadTooLargeError(
      `${label} is ${Math.round(approxBytes / 1024 / 1024)}MB, max is ${MAX_IMAGE_BYTES / 1024 / 1024}MB`
    );
  }
  return { mimeType, data: base64, bytes: approxBytes };
}

class ValidationError extends Error {}
class PayloadTooLargeError extends Error {}

// ─── Rate limit (Redis-backed, fails open) ──────────────────────────────────
//
// We import `redis` lazily so that if the module isn't installed in some
// environments the endpoint still works (rate limit just becomes a no-op).

async function checkRateLimit(tokenKey: string): Promise<boolean> {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) return true; // fail open, no Redis configured

  try {
    // Dynamic import to avoid boot cost if Redis is unused.
    const { createClient } = await import('redis');
    const client = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) =>
          retries > 2 ? new Error('max retries') : Math.min(retries * 100, 1000),
      },
    });
    client.on('error', () => {
      /* swallow — fail open on Redis errors */
    });
    await client.connect();

    // Fingerprint the token rather than store the raw string as a key.
    const bucketKey = `ratelimit:tryon-admin:${hash(tokenKey)}:${Math.floor(
      Date.now() / 60000
    )}`;
    const countRaw = await client.incr(bucketKey);
    const count =
      typeof countRaw === 'number' ? countRaw : parseInt(String(countRaw), 10);
    if (count === 1) {
      await client.expire(bucketKey, 70); // 70s TTL, slightly >1 min bucket
    }
    await client.quit().catch(() => {});
    return count <= MAX_REQUESTS_PER_MINUTE;
  } catch {
    return true; // any redis issue → fail open
  }
}

function hash(s: string): string {
  // Short FNV-1a — just for bucket keys, not security.
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h.toString(36);
}

// ─── Handler ────────────────────────────────────────────────────────────────

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // --- Admin token ---
  const token = readAdminTokenFromHeaders(req.headers);
  const payload = token ? safeVerify(token) : null;
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // --- Rate limit ---
  const allowed = await checkRateLimit(token!);
  if (!allowed) {
    return res.status(429).json({ error: 'Rate limit exceeded. Slow down.' });
  }

  // --- Env ---
  const apiKey = process.env.GEMINI_ADMIN_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: 'Server not configured: missing GEMINI_ADMIN_API_KEY' });
  }
  const model = process.env.GEMINI_TRYON_MODEL || DEFAULT_MODEL;

  // --- Validate body ---
  let faceImage: DecodedImage;
  let bodyImage: DecodedImage;
  let garmentImages: DecodedImage[];
  let prompt: string;
  let resolution: string | undefined;

  try {
    const body = (req.body ?? {}) as Record<string, unknown>;

    faceImage = decodeDataUrl(body.faceImage, 'faceImage');
    bodyImage = decodeDataUrl(body.bodyImage, 'bodyImage');

    if (!Array.isArray(body.garmentImages) || body.garmentImages.length === 0) {
      throw new ValidationError('garmentImages must be a non-empty array');
    }
    if (body.garmentImages.length > MAX_GARMENTS) {
      throw new ValidationError(
        `Too many garment images (max ${MAX_GARMENTS})`
      );
    }
    garmentImages = body.garmentImages.map((g, i) =>
      decodeDataUrl(g, `garmentImages[${i}]`)
    );

    if (typeof body.prompt !== 'string' || body.prompt.trim().length === 0) {
      throw new ValidationError('prompt is required');
    }
    if (body.prompt.length > MAX_PROMPT_CHARS) {
      throw new ValidationError(
        `prompt too long (max ${MAX_PROMPT_CHARS} chars)`
      );
    }
    prompt = body.prompt.trim();

    if (body.resolution !== undefined) {
      if (
        typeof body.resolution !== 'string' ||
        !ALLOWED_RESOLUTIONS.has(body.resolution)
      ) {
        throw new ValidationError(
          `resolution must be one of ${[...ALLOWED_RESOLUTIONS].join(', ')}`
        );
      }
      resolution = body.resolution;
    }
  } catch (err) {
    if (err instanceof PayloadTooLargeError) {
      return res.status(413).json({ error: err.message });
    }
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // --- Compose Gemini request ---
  const fullPrompt = buildPrompt(prompt, resolution);
  const parts: Array<Record<string, unknown>> = [{ text: fullPrompt }];
  parts.push({
    inline_data: { mime_type: faceImage.mimeType, data: faceImage.data },
  });
  parts.push({
    inline_data: { mime_type: bodyImage.mimeType, data: bodyImage.data },
  });
  for (const g of garmentImages) {
    parts.push({ inline_data: { mime_type: g.mimeType, data: g.data } });
  }

  const upstreamUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent`;

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Key in header, not query string — keeps it out of any upstream logs
        // that only log URLs.
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          responseModalities: ['IMAGE'],
        },
      }),
    });
  } catch {
    return res
      .status(502)
      .json({ error: 'Could not reach AI provider' });
  }

  if (!upstreamRes.ok) {
    // Bubble up a sanitised error. Never include the API key or full upstream
    // response body in client-visible errors.
    const status = upstreamRes.status;
    let message = 'Upstream AI provider error';
    try {
      const errBody: any = await upstreamRes.json();
      const upstreamMsg = errBody?.error?.message;
      if (typeof upstreamMsg === 'string') {
        // Strip anything that looks like an API key before echoing.
        message = upstreamMsg.replace(/AIza[A-Za-z0-9_-]{10,}/g, '[redacted]');
      }
    } catch {
      /* ignore */
    }
    // Map obvious ones to proper statuses.
    if (status === 401 || status === 403) {
      return res.status(500).json({
        error: 'Server not configured: GEMINI_ADMIN_API_KEY rejected by upstream',
      });
    }
    if (status === 429) {
      return res.status(429).json({ error: 'Upstream rate limit hit' });
    }
    return res.status(502).json({ error: message });
  }

  let upstreamJson: any;
  try {
    upstreamJson = await upstreamRes.json();
  } catch {
    return res.status(502).json({ error: 'Upstream returned invalid JSON' });
  }

  // Find the first inline_data part in the first candidate.
  const candidateParts: any[] =
    upstreamJson?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = candidateParts.find(
    (p) => p?.inline_data?.data || p?.inlineData?.data
  );
  if (!imagePart) {
    return res
      .status(502)
      .json({ error: 'Upstream response contained no image' });
  }
  const inline = imagePart.inline_data || imagePart.inlineData;
  const mimeType: string = inline.mime_type || inline.mimeType || 'image/png';
  const data: string = inline.data;

  return res.status(200).json({
    image: `data:${mimeType};base64,${data}`,
    mimeType,
  });
}

function safeVerify(token: string) {
  try {
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

function buildPrompt(userPrompt: string, resolution: string | undefined): string {
  // We pass the extra guidance as natural-language instructions since the
  // Flash Image model steers primarily via prompt.
  const header = [
    'You are generating a photorealistic virtual try-on image for a fashion e-commerce use case.',
    'Inputs are provided in order: (1) a face reference image of the customer, (2) a full-body reference image of the customer, (3+) one or more garment product images.',
    'Produce a single image of the SAME person (preserving identity, skin tone, body proportions, and facial features) wearing the garment(s). The garment should match the provided product images faithfully.',
    'Keep the lighting, pose, and composition natural. Do not include text, watermarks, or logos that were not present in the input garment images.',
  ];
  if (resolution) {
    header.push(
      `Render the output at approximately ${resolution} pixels, preserving aspect ratio of the requested resolution.`
    );
  }
  header.push('--- User direction follows ---', userPrompt);
  return header.join('\n\n');
}
