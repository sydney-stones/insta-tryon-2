# Security Setup Guide

> Rewritten 19 April 2026 after a `VITE_GEMINI_API_KEY` leak incident,
> then rewritten again the same day when the Gemini integration was
> removed entirely from the marketing site. Updated 20 April 2026 to
> document the admin-only try-on studio, which re-introduces a Gemini
> key — but only on the server, only behind admin auth, and isolated
> from the DSAPIKEY used on the Shopify demo store.

## What lives where now

The public site calls no AI provider. A single admin-gated endpoint
(`/api/tryon-admin`) uses a dedicated Gemini key for generating
personalised try-on assets used in cold-email outreach.

| Secret                  | Where it lives           | Who uses it                     |
| ----------------------- | ------------------------ | ------------------------------- |
| `ADMIN_PASSWORD`        | Vercel env (server-only) | `/api/admin-login.ts`           |
| `ADMIN_SECRET`          | Vercel env (server-only) | `/api/_adminAuth.ts` (signing)  |
| `REDIS_URL`             | Vercel env (server-only) | `/api/analytics.ts`, `/api/tryon-admin.ts` (rate limit) |
| `GEMINI_ADMIN_API_KEY`  | Vercel env (server-only) | `/api/tryon-admin.ts`           |
| `GEMINI_TRYON_MODEL`    | Vercel env (optional)    | `/api/tryon-admin.ts` (override, defaults to `gemini-3.1-flash-image`) |

`GEMINI_ADMIN_API_KEY` **must be a brand-new, dedicated key** — NOT the
`DSAPIKEY` used by the Shopify demo store. Keeping them isolated means
a future admin-side leak cannot take down the demo store, and vice versa.

## Required Vercel environment variables

In Vercel → Project → Settings → Environment Variables:

| Name                   | Example value                                       | Notes |
| ---------------------- | --------------------------------------------------- | ----- |
| `ADMIN_PASSWORD`       | strong random password                              | No `VITE_` prefix. Mark **Sensitive**. |
| `ADMIN_SECRET`         | 64 hex chars from `openssl rand -hex 32`            | Used to sign admin session tokens. Must be ≥32 chars. Mark **Sensitive**. |
| `REDIS_URL`            | `rediss://default:…@…upstash.io:6379`               | From Redis Cloud / Upstash. Mark **Sensitive**. |
| `GEMINI_ADMIN_API_KEY` | `AIza…` (dedicated admin-only key)                  | **New key**, separate from DSAPIKEY. Mark **Sensitive**. |
| `GEMINI_TRYON_MODEL`   | `gemini-3.1-flash-image` (default)                  | Optional override. Swap to `gemini-3-pro-image` for higher quality. |

**Do NOT** add any `VITE_*` secrets. Anything starting with `VITE_` is
baked into the public JS bundle and visible to every visitor.

**Always tick the Sensitive checkbox** for secret env vars in Vercel —
this encrypts them at rest and excludes them from the April 2026 Vercel
incident's affected set (non-sensitive env vars were the exposure surface).

## Local development

Create `.env` in the project root (gitignored):

```env
ADMIN_PASSWORD=your_secure_admin_password_here
ADMIN_SECRET=paste_the_output_of_openssl_rand_hex_32_here
REDIS_URL=rediss://…
GEMINI_ADMIN_API_KEY=AIza…   # dedicated admin-only key, NOT the Shopify DSAPIKEY
# GEMINI_TRYON_MODEL=gemini-3.1-flash-image   # optional override
```

`vite dev` does not run the `/api/*` functions — for local dev with
the serverless endpoints, use `vercel dev` instead:

```bash
npm install -g vercel
vercel dev
```

## Admin panel (`/admin`)

1. Navigate to `/admin`.
2. Enter the admin password — the browser sends it to `/api/admin-login`.
3. On success, the server returns an HMAC-signed token (8-hour TTL)
   which the browser stores in `sessionStorage` under `adminToken`.
4. The token is validated client-side on page refresh (`exp` check)
   AND re-verified on the server for every admin-only API call. The
   try-on studio endpoint (`/api/tryon-admin`) rejects any request
   without a valid unexpired token with HTTP 401.
5. Setting `sessionStorage.adminAuth = 'true'` (the old client-only
   auth flag) no longer does anything — the page reads `adminToken`.

## Custom Try-On Studio (`/admin` → Try-On Studio)

Admin-only tool for generating personalised try-on imagery for cold
email outreach. All inference happens in `/api/tryon-admin`:

- Reads `GEMINI_ADMIN_API_KEY` at request time from `process.env`. Key
  is never bundled into the browser and never echoed in responses.
- Requires a valid `x-admin-token` header (HTTP 401 without).
- Rate-limited to 20 requests/minute per token via Redis, fails open
  if Redis is unavailable so admin work isn't blocked by infra issues.
- Images are downscaled to ≤1600px on longest edge in the browser
  before upload, keeping payloads well under Vercel's 4.5 MB body cap.
- Images capped at 6 MB each server-side after base64 decode.
- Prompt capped at 4000 chars server-side.

## Verifying there are no client-bundled keys

After deploying, run from a private window:

```bash
curl -sL https://www.renderedfits.com/ \
  | grep -oE 'assets/index-[^"]+\.js' \
  | head -1
# → copy that path, then:
curl -s https://www.renderedfits.com/assets/index-XXXX.js \
  | grep -oE 'AIza[A-Za-z0-9_-]{35}' | head
```

Expected: zero hits. If any `AIza…` string shows up in the bundle,
something has been reintroduced incorrectly — do not deploy.

## Rotating the admin password

1. Update Vercel env var `ADMIN_PASSWORD` → redeploy.
2. Any currently-issued admin tokens remain valid until `exp` (8h). If
   you need to immediately invalidate existing sessions as well, rotate
   `ADMIN_SECRET` at the same time — that invalidates every token on
   next redeploy.

## What still goes in `VITE_*`

Only non-secret configuration. Examples:

- Feature flags: `VITE_FEATURE_NEW_UI=1`
- Public URLs: `VITE_PUBLIC_CDN=https://cdn.renderedfits.com`
- Analytics IDs that are intended to be public.

If in doubt: assume anyone on the internet can read it. If that's a
problem, don't use `VITE_`.

## Troubleshooting

### `/api/admin-login` returns 500 "missing ADMIN_PASSWORD"
`ADMIN_PASSWORD` is not set in Vercel for the environment you're using.

### `/api/admin-login` returns 500 "ADMIN_SECRET must be set and at least 32 chars long"
Set `ADMIN_SECRET` to the output of `openssl rand -hex 32` and redeploy.

### Admin token expired
Normal — 8-hour TTL. Log in again.
