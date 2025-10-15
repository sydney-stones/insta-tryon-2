# Vercel KV Setup Guide for Analytics

## Current Status ✅
Your analytics system is **already working**! I've implemented a hybrid approach:
- **Works now**: In-memory storage (resets on deployment)
- **After KV setup**: Persistent storage across all users and deployments

## Quick Start (3 Steps)

### Step 1: Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy your project
vercel --prod
```

### Step 2: Create KV Database

**Option A: Via Vercel Dashboard** (Recommended)
1. Go to https://vercel.com/dashboard
2. Click on your deployed project
3. Navigate to the **"Storage"** tab
4. Click **"Create Database"**
5. Select **"KV"**
6. Name it: `analytics-store`
7. Choose region: **US East** or closest to your users
8. Click **"Create"**
9. Click **"Connect to Project"** and select your project

**Option B: Via CLI** (Faster)
```bash
# Create KV store
vercel kv create analytics-store

# Link to your project (follow prompts)
vercel link
```

### Step 3: Redeploy
```bash
vercel --prod
```

That's it! Your analytics will now persist across deployments.

## Verify It's Working

### Check KV Connection
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. You should see these variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`

### Test Analytics
1. Visit your deployed site
2. Try on an outfit
3. Go to `/admin` → Analytics tab
4. You should see the try-on logged
5. Redeploy the site - analytics data should persist!

## How It Works

### Without KV (Current - Local Development)
- Analytics stored in memory
- Resets when server restarts
- Perfect for testing

### With KV (After Setup - Production)
- Analytics stored in Vercel's Redis
- Persists across deployments
- Shared across all users
- ~100,000 requests/month on free tier

## Local Development

### Option 1: Use In-Memory Storage (Easiest)
Just run `npm run dev` - works out of the box!

### Option 2: Connect to Production KV
```bash
# Pull environment variables from Vercel
vercel env pull .env.local

# Start dev server
npm run dev
```

Now your local environment uses production KV.

## Pricing

**Vercel KV Free Tier:**
- 256 MB storage
- 100,000 commands/month
- More than enough for analytics

**Your Usage:**
- ~2-3 commands per try-on
- Can handle ~30,000 try-ons/month on free tier

## Troubleshooting

### "KV not available" in logs
✅ **This is normal!** The system automatically falls back to in-memory storage.

### Analytics reset after deployment (without KV)
✅ **This is expected.** Set up KV to persist data.

### Environment variables not showing
- Make sure you've **created the KV database** first
- Run `vercel env pull .env.local` to sync variables

### Want to see raw data?
```bash
# List all KV stores
vercel kv ls

# Get analytics data
vercel kv get analytics:events --store analytics-store
```

## Alternative: Upstash Redis

If you prefer not to use Vercel KV, you can use Upstash:

1. Create free account at https://upstash.com
2. Create Redis database
3. Add environment variables to Vercel:
   ```
   KV_REST_API_URL=your-upstash-url
   KV_REST_API_TOKEN=your-upstash-token
   ```
4. Code works the same!

## Summary

✅ **Right now**: Analytics work with in-memory storage
✅ **After KV setup**: Analytics persist forever
✅ **No code changes needed**: Already implemented!

Just follow the 3 steps above when you're ready to deploy!
