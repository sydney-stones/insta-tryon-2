# Quick Start: Fix Your Blank Vercel Site in 5 Minutes

## The Problem
Your site at https://rendered-fits.vercel.app is blank because the Gemini API key environment variable isn't configured.

## The Solution (3 Simple Steps)

### Step 1: Get Your Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

### Step 2: Add to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Open your `rendered-fits` project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key:** `VITE_GEMINI_API_KEY`
   - **Value:** [Your API key from Step 1]
   - **Environments:** Check all three (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the three dots (•••) on the latest deployment
3. Click **Redeploy**

**That's it!** Your site will be live in 1-2 minutes.

---

## Add Your Custom Domain (renderedfits.com)

1. In Vercel project → **Settings** → **Domains**
2. Add `renderedfits.com`
3. Add `www.renderedfits.com`
4. Copy the DNS records Vercel shows you
5. Add those DNS records at your domain registrar (where you bought renderedfits.com)
6. Wait 1-24 hours for DNS to propagate

---

## Security Notes

✅ Your API key is safe in Vercel's environment variables
✅ It's NOT in your GitHub repository
✅ The `.gitignore` file now protects `.env` files
✅ HTTPS is automatic via Vercel

**Never commit `.env` files to GitHub!**

---

For detailed instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
