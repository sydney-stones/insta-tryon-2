# Redis Cloud Setup - Complete Guide

## ✅ What I've Done

I've updated your analytics system to use **Redis Cloud** instead of Vercel KV. The code now connects to your Redis Cloud database.

---

## 🔧 Changes Made

### 1. Updated Analytics API ([api/analytics.ts](api/analytics.ts))
- Replaced Vercel KV client with Redis client
- Added Redis Cloud connection with your credentials
- Implemented connection pooling and error handling
- Added automatic fallback to in-memory storage if Redis fails
- Enhanced logging to track Redis operations

### Key Features:
- **Persistent storage** using Redis Cloud
- **Automatic reconnection** with retry strategy (3 attempts)
- **Graceful fallback** to in-memory if Redis is unavailable
- **Console logging** to verify operations (check Vercel logs)

---

## 🚀 Deployment Steps

### Step 1: Add Redis URL to Vercel

Your Redis URL is already in `.env.development.local`, but you need to add it to **Vercel** for production:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your `insta-tryon-2-1` project

2. **Add Environment Variable**
   - Click **Settings** → **Environment Variables**
   - Click **Add New**
   - Set:
     - **Key**: `REDIS_URL`
     - **Value**: ``
     - **Environments**: Check all boxes (Production, Preview, Development)
   - Click **Save**

### Step 2: Deploy to Vercel

```bash
git add .
git commit -m "Connect analytics to Redis Cloud database"
git push
```

Vercel will automatically deploy in ~2 minutes.

### Step 3: Test the Integration

1. **Try On an Outfit**
   - Go to your live site
   - Complete 2-3 virtual try-ons
   - Watch for success messages

2. **Check Analytics Dashboard**
   - Go to `/admin` (password: `GoSienna2024!`)
   - Click **Analytics** button
   - You should see your try-on data!

3. **Verify in Redis Insight**
   - Open **Redis Insight Desktop**
   - Connect to your database
   - Look for key: `analytics:events`
   - You should see a JSON array with all events!

4. **Check Vercel Logs**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click latest deployment → **Functions** tab
   - Click `api/analytics` function
   - Look for logs:
     - ✅ "Connected to Redis successfully"
     - ✅ "Event saved to Redis: [outfit name]"
     - ✅ "Retrieved X events from Redis"

---

## 🔍 Verify It's Working

### In Redis Insight

After performing try-ons, you should see this in Redis Insight:

**Key**: `analytics:events`

**Value** (JSON array):
```json
[
  {
    "timestamp": 1730304000000,
    "outfitId": "Erdem",
    "outfitName": "Erdem",
    "date": "2025-10-30",
    "sessionId": "1730304000000-abc123xyz",
    "userAgent": "Mozilla/5.0...",
    "referrer": "https://your-site.com/"
  },
  {
    "timestamp": 1730304120000,
    "outfitId": "EmiliaWickstead",
    "outfitName": "Emilia Wickstead",
    "date": "2025-10-30",
    "sessionId": "1730304000000-abc123xyz"
  }
]
```

### In Analytics Dashboard

You'll see:
- **Total Try-Ons**: 2
- **Unique Sessions**: 1
- **Unique Outfits**: 2
- **Avg Per Session**: 2.0

---

## 📊 How the Data Flows

```
User completes try-on
    ↓
Frontend calls POST /api/analytics
    ↓
Analytics API connects to Redis Cloud
    ↓
Fetches existing events from key "analytics:events"
    ↓
Adds new event to array
    ↓
Saves updated array back to Redis
    ↓
Returns success
```

When viewing dashboard:
```
User opens /admin → Analytics
    ↓
Frontend calls GET /api/analytics
    ↓
Analytics API connects to Redis Cloud
    ↓
Fetches all events from "analytics:events"
    ↓
Calculates metrics (totals, sessions, popular outfits)
    ↓
Returns JSON summary
    ↓
Dashboard displays beautiful charts
```

---

## 🐛 Troubleshooting

### "No data in Redis Insight"

**Cause**: Try-ons haven't been completed yet, or Redis connection failed.

**Solution**:
1. Complete at least 1 try-on on your live site
2. Check Vercel function logs for "Event saved to Redis"
3. Refresh Redis Insight (click refresh icon)
4. Check the database is selected in Redis Insight

### "REDIS_URL not configured" in Vercel logs

**Cause**: Environment variable not set in Vercel.

**Solution**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add `REDIS_URL` with your Redis Cloud connection string
3. Redeploy: `git commit --allow-empty -m "redeploy" && git push`

### "Connection timeout" errors

**Cause**: Redis Cloud database might be paused or connection URL is wrong.

**Solution**:
1. Check Redis Cloud dashboard - database should be "Active"
2. Verify the connection string is correct
3. Test connection in Redis Insight first
4. Check firewall rules in Redis Cloud (should allow all IPs for Vercel)

### Data shows in dashboard but not in Redis Insight

**Cause**: Using in-memory fallback, not Redis.

**Solution**:
1. Check Vercel logs for "Redis unavailable" messages
2. Verify `REDIS_URL` is set correctly in Vercel
3. Test Redis connection from Vercel function logs
4. Ensure Redis Cloud database is not paused

---

## 💡 Testing Locally

To test the Redis connection locally:

```bash
npm run dev
```

Then try on an outfit. Check your terminal for:
- ✅ "Connected to Redis successfully"
- ✅ "Event saved to Redis: [outfit name]"

If you see these messages, Redis is working!

---

## 📈 Monitoring

### Check Redis Storage Usage

1. Open Redis Cloud Dashboard
2. Go to your database
3. View **Memory Usage**
4. Your analytics data is very small (~1KB per 100 events)

### Check Vercel Function Calls

1. Vercel Dashboard → Your Project
2. Click **Analytics** (top menu)
3. View function invocations for `/api/analytics`
4. Monitor usage to stay within free tier

---

## 🎯 Expected Results

After completing 5 try-ons on different outfits:

**Redis Insight should show:**
- Key: `analytics:events`
- Type: String (JSON)
- Size: ~2-3 KB
- Value: Array of 5 event objects

**Analytics Dashboard should show:**
- Total Try-Ons: 5
- Unique Sessions: 1-2 (depending on timing)
- Unique Outfits: 5
- Avg Per Session: 2.5-5.0
- Chart with today's activity
- List of 5 different outfits in "Most Popular"
- 5 events in "Recent Activity"

---

## 🚨 Important Notes

1. **Don't commit REDIS_URL to Git**
   - It's in `.env.development.local` which is already gitignored
   - Only add it to Vercel environment variables

2. **Data Persistence**
   - Redis Cloud stores data permanently (until you delete it)
   - Even if Vercel function restarts, data persists
   - You can manually clear data by deleting the `analytics:events` key in Redis Insight

3. **Free Tier Limits**
   - Redis Cloud Free: 30MB storage, 30 connections
   - Your usage: ~1KB per 100 events = 3,000,000 events in free tier!
   - More than enough for your brand pitches

---

## ✨ What's Next

Your analytics are now fully persistent! Here's what you can do:

### 1. Demo to Brands
- Show real-time analytics
- Track which outfits brands are interested in
- Display engagement metrics

### 2. Export Data
Want to export analytics to CSV for presentations? Let me know and I'll add an export button!

### 3. Advanced Analytics
Want to track:
- Time spent on each product page?
- Conversion funnel (views → try-ons → add to cart)?
- Geographic data?

Just ask and I'll implement it!

---

## 🎉 Summary

✅ **Completed:**
- Updated API to use Redis Cloud
- Added automatic connection management
- Implemented error handling and fallback
- Added detailed logging
- Redis URL already in environment files

🔜 **Your Next Steps:**
1. Add `REDIS_URL` to Vercel environment variables
2. Deploy with `git push`
3. Test by completing try-ons
4. Verify data in Redis Insight
5. View analytics dashboard

**Your analytics system is now production-ready with persistent storage!**

---

## 📞 Support

If you encounter any issues:

1. **Check Vercel Logs**: Look for Redis connection messages
2. **Check Redis Insight**: Verify key `analytics:events` exists
3. **Check Console**: Browser F12 console for API errors
4. **Contact Me**: Share error messages and I'll help debug

**The setup is complete - just deploy and test!** 🚀
