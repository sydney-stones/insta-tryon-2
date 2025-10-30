# Analytics Quick Start - 3 Simple Steps

## 🎯 Goal
Fix analytics resetting every 30 minutes by activating Vercel KV persistent storage.

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Create Vercel KV Database

1. Go to: https://vercel.com/dashboard
2. Open your `insta-tryon-2-1` project
3. Click **Storage** tab → **Create Database**
4. Select **KV (Key-Value Store)**
5. Name: `analytics-kv`
6. Click **Create** → **Connect to Project**

✅ Vercel automatically adds environment variables!

### Step 2: Deploy Changes

```bash
git add .
git commit -m "Enhance analytics with persistent storage"
git push
```

✅ Vercel auto-deploys in ~2 minutes!

### Step 3: Test It

1. Visit your live site
2. Try on 2-3 outfits
3. Go to `/admin` (password: `GoSienna2024!`)
4. Click **Analytics** button
5. See your data!

Wait 30 minutes → Refresh → **Data persists!** 🎉

---

## 🆕 What's New

### Dashboard Shows:
- **Total Try-Ons** - All-time count
- **Unique Sessions** - Distinct users
- **Unique Outfits** - Different outfits tried
- **Avg Per Session** - Try-ons per user
- **7-Day Chart** - Visual activity
- **Top 10 Outfits** - Most popular
- **Recent Activity** - Live feed

### Under the Hood:
- ✅ Session tracking (30-min windows)
- ✅ User agent detection
- ✅ Referrer tracking
- ✅ Persistent storage (Vercel KV)
- ✅ 10,000 event capacity
- ✅ Free tier friendly

---

## 💰 Cost

**FREE** with Vercel Hobby plan:
- 30,000 commands/day
- 256 MB storage
- More than enough for brand pitches!

---

## 📊 View Analytics

**URL**: `https://your-domain.com/admin`

**Password**: `GoSienna2024!`

Click the **Analytics** button in the admin dashboard.

---

## 🔧 Troubleshooting

### Data Still Resetting?

1. Check Vercel Dashboard → Storage → KV exists
2. Verify environment variables: `KV_REST_API_URL`, `KV_REST_API_TOKEN`
3. Redeploy: `git commit --allow-empty -m "redeploy" && git push`

### No Data Showing?

1. Complete at least 1 try-on
2. Check browser console (F12) for errors
3. Test API: `curl https://your-domain.com/api/analytics`

---

## 📞 Need Help?

Check the full guide: [ANALYTICS_SETUP_GUIDE.md](./ANALYTICS_SETUP_GUIDE.md)

---

**That's it! Your analytics are now production-ready for brand pitches.** 🚀
