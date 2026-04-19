<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Rendered Fits — Marketing Site

Marketing site for Rendered Fits, a virtual try-on platform for fashion
brands (Emilia Wickstead, ERDEM, Manolo Blahnik, Really Wild, Uniqlo, etc.).

**Live site:** [https://renderedfits.com](https://renderedfits.com)

## What this repo is (and isn't)

This is the **marketing site only**. It showcases pre-rendered try-on
examples to prospective merchants. Product pages use static imagery and
videos — there is no live AI try-on running on this domain.

Live, interactive try-on demos run on the separate **Shopify demo store**
(configured via `DSAPIKEY`). If a merchant wants a live demo, their
products get added to the Shopify store rather than being wired into
this codebase.

As of 19 April 2026 the Gemini API integration has been removed from
this repo. See [SECURITY_SETUP.md](SECURITY_SETUP.md) for the context
(a client-side API key leak triggered the refactor / removal).

## 💻 Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. Clone the repository:
   ```bash
   git clone https://github.com/sydney-stones/insta-tryon-2.git
   cd insta-tryon-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) create a `.env` file if you need to run the admin gate
   locally — see [SECURITY_SETUP.md](SECURITY_SETUP.md).

4. Run the dev server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173)

For local development with the `/api/*` serverless functions, use
`vercel dev` instead of `npm run dev`.

## 🔐 Security

- **Never commit `.env` files** — they are protected in `.gitignore`.
- **Admin password lives in Vercel env vars**, never in the client bundle.
- See [SECURITY_SETUP.md](SECURITY_SETUP.md) for the full setup + the
  post-leak rotation procedure.

## 📦 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Build tool:** Vite
- **Hosting:** Vercel
- **Analytics store:** Redis Cloud (via `/api/analytics`)
- **Domain:** renderedfits.com

## 🎨 Features

- Pre-rendered virtual try-on showcase across ~20 fashion brands
- Brand-specific demo pages (Cernucci, Allude, ERDEM, Mr Button, etc.)
- Admin dashboard for editing the wardrobe + viewing analytics
- Blog and legal pages

## Key docs

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) — full deploy instructions
- [SECURITY_SETUP.md](SECURITY_SETUP.md) — env vars and admin auth
- [SHOPIFY_MIGRATION_GUIDE.md](SHOPIFY_MIGRATION_GUIDE.md) — the plan for
  routing live demos to the Shopify store
- [SEO_OPTIMIZATION_GUIDE.md](SEO_OPTIMIZATION_GUIDE.md) — SEO setup
- [REDIS_SETUP_COMPLETE.md](REDIS_SETUP_COMPLETE.md) — analytics backend
- [COMPLETE_ANALYTICS_GUIDE.md](COMPLETE_ANALYTICS_GUIDE.md) — analytics setup
- [GODADDY_DNS_SETUP.md](GODADDY_DNS_SETUP.md) / [DNS_QUICK_REFERENCE.md](DNS_QUICK_REFERENCE.md) — domain config
- [FAVICON_GUIDE.md](FAVICON_GUIDE.md) — favicons
- [ERDEM_PRODUCT_PAGE_FINAL.md](ERDEM_PRODUCT_PAGE_FINAL.md) — ERDEM pitch page notes

## 📝 License

Apache-2.0
