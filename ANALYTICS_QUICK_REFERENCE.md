# Analytics Quick Reference Card

## 🎯 Two Analytics Systems Active

### 1. Custom Try-On Analytics (Redis)
**Tracks:** Virtual try-on events, sessions, popular outfits

### 2. Vercel Page Analytics
**Tracks:** Page views, traffic sources, visitors

---

## 🚀 Setup Checklist

### Step 1: Add REDIS_URL to Vercel
- [ ] Go to Vercel Dashboard → Settings → Environment Variables
- [ ] Add `REDIS_URL` = ``
- [ ] Check all environments (Production, Preview, Development)
- [ ] Click Save

### Step 2: Deploy
```bash
git add .
git commit -m "Complete analytics: Redis + Vercel"
git push
```

### Step 3: Test
- [ ] Try on 3 outfits on live site
- [ ] Visit multiple pages
- [ ] Check `/admin` → Analytics
- [ ] Check Vercel Dashboard → Analytics tab
- [ ] Check Redis Insight for `analytics:events` key

---

## 📊 Where to View Data

| What | Where | URL/Path |
|------|-------|----------|
| **Try-On Dashboard** | Custom admin panel | `/admin` → Analytics button |
| **Page Views** | Vercel Dashboard | https://vercel.com/dashboard |
| **Raw Data** | Redis Insight Desktop | Key: `analytics:events` |
| **Function Logs** | Vercel Deployments | Functions tab → `api/analytics` |

---

## 🔑 Quick Access

**Admin Password:** `GoSienna2024!`

**Redis Key:** `analytics:events`

**API Endpoint:** `/api/analytics` (GET for data, POST for logging)

---

## 📈 Key Metrics

### Custom Analytics Shows:
- Total Try-Ons
- Unique Sessions
- Unique Outfits
- Avg Per Session
- 7-Day Chart
- Top 10 Outfits
- Recent Activity

### Vercel Analytics Shows:
- Page Views
- Unique Visitors
- Top Pages
- Traffic Sources
- Countries
- Devices (Mobile/Desktop)

---

## ✅ Success Indicators

After deployment, you should see:

**In Vercel Logs:**
```
✓ Connected to Redis successfully
✓ Event saved to Redis: Erdem
✓ Retrieved X events from Redis
```

**In Custom Dashboard:**
- Numbers > 0 in all metric cards
- Bars in 7-day chart
- Items in "Most Popular Outfits"
- Events in "Recent Activity"

**In Vercel Analytics:**
- Page view graph shows activity
- Top pages list appears
- Visitor count > 0

**In Redis Insight:**
- Key `analytics:events` exists
- Value is JSON array
- Array length matches try-on count

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| No try-on data | Complete at least 1 try-on, check Redis URL in Vercel |
| No page views | Wait 30-60 seconds, disable ad blockers |
| Redis Insight empty | Refresh (F5), verify database connection |
| "Connection failed" | Check Redis Cloud database is Active, not paused |

---

## 💰 Cost

**Total: $0/month**
- Redis Cloud: Free tier (30MB)
- Vercel Analytics: Free tier (unlimited pageviews on Hobby)

---

## 📞 Documentation

- **Complete Guide:** [COMPLETE_ANALYTICS_GUIDE.md](./COMPLETE_ANALYTICS_GUIDE.md)
- **Redis Setup:** [REDIS_SETUP_COMPLETE.md](./REDIS_SETUP_COMPLETE.md)
- **Deployment:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 🎉 You're Ready!

1. Add `REDIS_URL` to Vercel
2. Deploy with `git push`
3. Test try-ons and page views
4. View analytics in both dashboards
5. Impress brands with data! 🚀

---

**Built with ❤️ for Festival of Fashion pitch**
