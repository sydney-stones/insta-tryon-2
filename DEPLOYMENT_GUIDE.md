# Rendered Fits — Deployment Guide

Rewritten 19 April 2026 after the Gemini removal. The site now runs
with no AI provider keys; live try-on demos live on the Shopify demo
store.

## Quick version

1. Set the Vercel env vars listed in [SECURITY_SETUP.md](SECURITY_SETUP.md).
2. Push to `main`. Vercel deploys automatically.
3. Domain: `renderedfits.com` (see [GODADDY_DNS_SETUP.md](GODADDY_DNS_SETUP.md)).

## Vercel environment variables

Set these in Vercel → Project → Settings → Environment Variables for
Production (and Preview / Development if you use them):

| Name                    | Required?                  | Notes                                                        |
| ----------------------- | -------------------------- | ------------------------------------------------------------ |
| `ADMIN_PASSWORD`        | Yes                        | Strong random password. Gate for `/admin`.                   |
| `ADMIN_SECRET`          | Yes                        | 64 hex chars (`openssl rand -hex 32`). Signs admin tokens.   |
| `REDIS_URL`             | Optional                   | Redis Cloud / Upstash URL. Enables analytics persistence and per-token rate limiting on `/api/tryon-admin`. |
| `GEMINI_ADMIN_API_KEY`  | Yes for Try-On Studio      | Dedicated Gemini key for `/api/tryon-admin`. MUST be separate from the Shopify DSAPIKEY. |
| `GEMINI_TRYON_MODEL`    | Optional                   | Overrides the Gemini image model. Default: `gemini-3.1-flash-image`. |

All of these are **server-only**. Do NOT prefix with `VITE_`. Tick the
**Sensitive** box for each one — it encrypts them at rest and excludes
them from the April 2026 Vercel incident's affected set (non-sensitive
env vars were the exposure surface).

See [SECURITY_SETUP.md](SECURITY_SETUP.md) for why and how.

## Step-by-step first-time deploy

1. **Import the repo into Vercel.**
   - Project → New → Import Git Repository → select `sydney-stones/insta-tryon-2`.
   - Framework preset: Vite.
   - Build command: `npm run build` (default).
   - Output directory: `dist` (default).

2. **Add environment variables** (see table above) before the first
   deploy. Missing `ADMIN_PASSWORD` or `ADMIN_SECRET` will cause
   `/api/admin-login` to return 500 — the rest of the site will still
   render.

3. **Connect the custom domain.**
   - Vercel → Project → Settings → Domains → add `renderedfits.com`
     and `www.renderedfits.com`.
   - Point DNS from GoDaddy: see [GODADDY_DNS_SETUP.md](GODADDY_DNS_SETUP.md)
     and [DNS_QUICK_REFERENCE.md](DNS_QUICK_REFERENCE.md).

4. **Deploy.** Vercel will build and serve `dist/` as static assets,
   with the `/api/*` TypeScript files running as serverless functions.

## Redeploying

Push to `main` — Vercel picks it up automatically. For environment
variable changes, you must manually trigger a redeploy from the Vercel
dashboard (Deployments → ⋯ → Redeploy) so the new values are baked in.

## Local dev vs Vercel dev

- `npm run dev` — Vite only. The `/api/*` routes will 404 in local.
- `vercel dev` — runs both Vite and the serverless functions. Use this
  if you're touching the admin login or analytics endpoint.

```bash
npm install -g vercel
vercel dev
```

## Post-deploy sanity checks

```bash
# 1. Site returns HTML
curl -sI https://www.renderedfits.com/ | head -1

# 2. No AI API keys leaked into the bundle
curl -sL https://www.renderedfits.com/ \
  | grep -oE 'assets/index-[^"]+\.js' | head -1 \
  | xargs -I {} curl -s "https://www.renderedfits.com/{}" \
  | grep -oE 'AIza[A-Za-z0-9_-]{35}'  # must be empty

# 3. Admin login endpoint is alive (expect 400 with "password is required")
curl -s -X POST https://www.renderedfits.com/api/admin-login \
  -H 'Content-Type: application/json' -d '{}'

# 4. Analytics endpoint is alive
curl -s https://www.renderedfits.com/api/analytics | head -c 200

# 5. Try-on studio endpoint rejects unauthenticated requests (expect 401)
curl -s -X POST https://www.renderedfits.com/api/tryon-admin \
  -H 'Content-Type: application/json' -d '{}'
# expected: {"error":"Unauthorized"}
```

## Rollback

Vercel keeps previous deploys. To roll back:
Deployments → select a known-good deploy → ⋯ → Promote to Production.

## Troubleshooting

### Blank page after deploy
Open DevTools → Network → check for 4xx/5xx on the JS bundle. Usually
a build failure that still deployed a broken `dist/`. Check the latest
deploy log in Vercel.

### `/api/*` routes 404 locally
You're running `npm run dev`. Use `vercel dev` instead.

### `/admin` login fails with HTTP 500
`ADMIN_PASSWORD` or `ADMIN_SECRET` is missing in Vercel env for the
environment you're hitting. Also check that `ADMIN_SECRET` is ≥32
chars — shorter secrets are rejected at token-signing time.

### Try-On Studio says "Server not configured: missing GEMINI_ADMIN_API_KEY"
`GEMINI_ADMIN_API_KEY` is not set in Vercel for the environment
you're hitting. Add it (Sensitive) and redeploy.

### Try-On Studio returns "Server not configured: GEMINI_ADMIN_API_KEY rejected by upstream"
Google is returning 401/403 on the key. Usual causes: the key has
been deleted, is restricted to a different API / referrer, or is
scoped to a different GCP project. Check in Google Cloud Console →
APIs & Services → Credentials, and that Generative Language API is
enabled on the project that owns the key.
