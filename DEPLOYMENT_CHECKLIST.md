# 🚀 Deployment Checklist - Redis Analytics

## Quick Setup (3 Steps)

### ✅ Step 1: Add Redis URL to Vercel (2 minutes)

1. Go to: https://vercel.com/dashboard
2. Select project: `insta-tryon-2-1`
3. Click: **Settings** → **Environment Variables**
4. Click: **Add New**
5. Enter:
   - **Key**: `REDIS_URL`
   - **Value**: ``
   - **Environments**: ✓ Production ✓ Preview ✓ Development
6. Click: **Save**

### ✅ Step 2: Deploy (1 minute)

```bash
git add .
git commit -m "Connect analytics to Redis Cloud"
git push
```

Wait ~2 minutes for Vercel to deploy.

### ✅ Step 3: Test (3 minutes)

1. **Complete Try-Ons**
   - Visit your live site
   - Try on 3-5 different outfits
   - Wait for "Try-On Complete!" message

2. **Check Analytics Dashboard**
   - Go to: `https://your-site.com/admin`
   - Password: `GoSienna2024!`
   - Click: **Analytics** button
   - See data! 🎉

3. **Verify in Redis Insight**
   - Open Redis Insight Desktop
   - Refresh database
   - Find key: `analytics:events`
   - Should see JSON array with events

---

## 🎯 Expected Results

After 5 try-ons, you should see:

### In Analytics Dashboard:
- Total Try-Ons: **5**
- Unique Sessions: **1-2**
- Unique Outfits: **5**
- Avg Per Session: **2.5-5.0**
- 7-day chart with today's bar
- Most popular outfits list
- Recent activity feed

### In Redis Insight:
- **Key**: `analytics:events`
- **Type**: String
- **Size**: ~2-3 KB
- **Value**: JSON array with 5 objects

---

## 🔍 Verification Commands

### Check Vercel Logs:
1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Functions tab → `api/analytics`
4. Look for:
   ```
   ✓ Connected to Redis successfully
   ✓ Event saved to Redis: [outfit name]
   ✓ Retrieved X events from Redis
   ```

### Test API Directly:
```bash
# Test GET endpoint
curl https://your-site.com/api/analytics

# Should return JSON with analytics data
```

---

## ❌ Troubleshooting

### No data in Redis?
- **Check**: Vercel environment variables set?
- **Check**: Completed try-ons after deployment?
- **Check**: Vercel logs show "Connected to Redis"?

### Still using in-memory?
- **Check**: `REDIS_URL` in Vercel env vars
- **Check**: Redis Cloud database is "Active"
- **Redeploy**: `git commit --allow-empty -m "redeploy" && git push`

### Connection errors?
- **Check**: Redis URL is exactly correct (no spaces)
- **Check**: Redis Cloud database not paused
- **Test**: Connection in Redis Insight first

---

## 📞 Need Help?

See full documentation:
- [REDIS_SETUP_COMPLETE.md](./REDIS_SETUP_COMPLETE.md) - Complete guide
- [ANALYTICS_SETUP_GUIDE.md](./ANALYTICS_SETUP_GUIDE.md) - Analytics overview

---

## ✨ Done!

Once you complete these 3 steps, your analytics will persist permanently in Redis Cloud. No more data resets! 🎉

**Ready for brand pitches!** 💼
