/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Vercel serverless function — Vertex AI Virtual Try-On
 * Proxies requests to Google's Vertex AI Virtual Try-On API using
 * a service account stored as GOOGLE_APPLICATION_CREDENTIALS_JSON env var.
 *
 * Required Vercel environment variables:
 *   GOOGLE_CLOUD_PROJECT              — GCP project ID (e.g. renderedfitsnew)
 *   GOOGLE_APPLICATION_CREDENTIALS_JSON — full service account JSON string
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

const LOCATION = 'us-central1';
const MODEL = 'virtual-try-on-preview-08-04';

async function getAccessToken(serviceAccountJson: string): Promise<string> {
  const credentials = JSON.parse(serviceAccountJson);

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: credentials.client_email,
    sub: credentials.client_email,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url');

  const signingInput = `${encode(header)}.${encode(payload)}`;

  // Sign with RSA-SHA256 using the service account private key
  const crypto = await import('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signingInput);
  const signature = sign.sign(credentials.private_key, 'base64url');

  const jwt = `${signingInput}.${signature}`;

  // Exchange JWT for access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    throw new Error(`Failed to get access token: ${text}`);
  }

  const tokenData = await tokenRes.json() as { access_token: string };
  return tokenData.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { person_image, garment_image } = req.body as {
    person_image?: string;
    garment_image?: string;
  };

  if (!person_image || !garment_image) {
    return res.status(400).json({ error: 'Missing person_image or garment_image' });
  }

  const project = process.env.GOOGLE_CLOUD_PROJECT;
  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

  if (!project || !credentialsJson) {
    return res.status(500).json({ error: 'Server not configured: missing GOOGLE_CLOUD_PROJECT or GOOGLE_APPLICATION_CREDENTIALS_JSON' });
  }

  try {
    const accessToken = await getAccessToken(credentialsJson);

    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${project}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

    // Strip data URL prefix if present
    const cleanBase64 = (b64: string) => b64.includes(',') ? b64.split(',')[1] : b64;

    const apiRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [
          {
            personImage: {
              image: { bytesBase64Encoded: cleanBase64(person_image) },
            },
            productImages: [
              {
                image: { bytesBase64Encoded: cleanBase64(garment_image) },
              },
            ],
          },
        ],
        parameters: {
          sampleCount: 1,
          addWatermark: false,
          baseSteps: 32,
        },
      }),
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      console.error('Vertex AI error:', errorText);
      return res.status(apiRes.status).json({ error: `Vertex AI error: ${errorText}` });
    }

    const data = await apiRes.json() as {
      predictions?: Array<{ image: { bytesBase64Encoded: string } }>;
    };

    const resultBase64 = data.predictions?.[0]?.image?.bytesBase64Encoded;
    if (!resultBase64) {
      return res.status(500).json({ error: 'No image returned from Vertex AI' });
    }

    return res.status(200).json({
      success: true,
      result_image: resultBase64,
    });
  } catch (err) {
    console.error('Tryon handler error:', err);
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Internal server error' });
  }
}
