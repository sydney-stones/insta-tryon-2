# Security Setup Guide

> Rewritten 19 April 2026 after a `VITE_GEMINI_API_KEY` leak incident,
> then rewritten again the same day when the Gemini integration was
> removed entirely from the marketing site. Live try-on demos now run
> on the Shopify demo store; this site only ships static, pre-rendered
> try-on content. See `Leak_Vector_Forensics.md` (ops folder) for the
> leak write-up.

## What lives where now

The marketing site no longer calls any AI provider. The only env vars
that exist are for the admin gate and for Redis-backed analytics:

| Secret           | Where it lives           | Who uses it                     |
| ---------------- | ------------------------ | ------------------------------- |
| `ADMIN_PASSWORD` | Vercel env (server-only) | `/api/admin-login.ts`           |
| `ADMIN_SECRET`   | Vercel env (server-only) | `/api/_adminAuth.ts` (signing)  |
| `REDIS_URL`      | Vercel env (server-only) | `/api/analytics.ts`             |

No Gemini / Google AI keys are required — and none should be added
back to this repo. If you need a live AI-powered demo, do it on the
Shopify demo store.

## Required Vercel environment variables

In Vercel → Project → Settings → Environment Variables:

| Name             | Example value                                                     | Notes |
| ---------------- | ----------------------------------------------------------------- | ----- |
| `ADMIN_PASSWORD` | strong random password                                            | No `VITE_` prefix. |
| `ADMIN_SECRET`   | 64 hex chars from `openssl rand -hex 32`                          | Used to sign admin session tokens. Must be ≥32 chars. |
| `REDIS_URL`      | `rediss://default:…@…upstash.io:6379`                             | From Redis Cloud / Upstash. |

**Do NOT** add any `VITE_*` secrets. Anything starting with `VITE_` is
baked into the public JS bundle and visible to every visitor.

## Local development

Create `.env` in the project root (gitignored):

```env
ADMIN_PASSWORD=your_secure_admin_password_here
ADMIN_SECRET=paste_the_output_of_openssl_rand_hex_32_here
REDIS_URL=rediss://…
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
4. The token is validated client-side on page refresh (`exp` check).
   No server endpoint currently requires the token, because the admin
   dashboard only does client-side work (editing a `localStorage`
   wardrobe, viewing public analytics). The signing infrastructure is
   retained so any future admin-only API route can enforce it.
5. Setting `sessionStorage.adminAuth = 'true'` (the old client-only
   auth flag) no longer does anything — the page reads `adminToken`.

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
