# Pre-Launch Checklist for Rendered Fits

Use this checklist to ensure everything is ready for your fashion networking event.

## 📋 Before You Start

- [ ] You have a Gemini API key from https://aistudio.google.com/app/apikey
- [ ] You have access to your Vercel account
- [ ] You have access to your domain registrar for renderedfits.com
- [ ] You've committed the latest code changes to GitHub

## 🔧 Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Add fashion brands and deployment documentation"
git push origin main
```
- [ ] Code pushed successfully
- [ ] Vercel deployment triggered automatically

### 2. Configure Vercel Environment Variables
- [ ] Logged into Vercel dashboard
- [ ] Opened rendered-fits project
- [ ] Navigated to Settings → Environment Variables
- [ ] Added `VITE_GEMINI_API_KEY` with your API key
- [ ] Selected all three environments (Production, Preview, Development)
- [ ] Clicked Save

### 3. Redeploy Application
- [ ] Went to Deployments tab
- [ ] Clicked ••• on latest deployment
- [ ] Clicked Redeploy
- [ ] Deployment completed successfully (green checkmark)

### 4. Verify Site Works
- [ ] Visited https://rendered-fits.vercel.app
- [ ] Site loads (no blank page)
- [ ] All 5 fashion brands visible:
  - [ ] Emilia Wickstead
  - [ ] Uniqlo
  - [ ] Really Wild
  - [ ] ERDEM
  - [ ] Manolo Blahnik
- [ ] Clicked on each outfit to view details
- [ ] Product links work correctly

### 5. Set Up Custom Domain
- [ ] In Vercel: Settings → Domains
- [ ] Added renderedfits.com
- [ ] Added www.renderedfits.com
- [ ] Copied DNS records from Vercel
- [ ] Logged into domain registrar
- [ ] Added A record: @ → 76.76.21.21
- [ ] Added CNAME record: www → cname.vercel-dns.com
- [ ] Saved DNS changes

### 6. Wait for DNS Propagation
- [ ] Checked DNS propagation at https://dnschecker.org
- [ ] Domain resolves to Vercel
- [ ] SSL certificate provisioned (may take a few minutes)
- [ ] Visited https://renderedfits.com (works!)
- [ ] Visited https://www.renderedfits.com (works!)

## 🔒 Security Verification

- [ ] No `.env` files in GitHub repository
- [ ] API key only stored in Vercel environment variables
- [ ] `.gitignore` includes `.env` patterns
- [ ] Site uses HTTPS (padlock icon visible)
- [ ] No security warnings in browser console

## 📱 Cross-Device Testing

- [ ] Desktop browser (Chrome/Safari/Firefox)
- [ ] Mobile browser (iOS Safari / Android Chrome)
- [ ] Tablet (if available)
- [ ] All devices show:
  - [ ] Site loads correctly
  - [ ] Images display properly
  - [ ] Navigation works
  - [ ] Product pages accessible

## 🎨 Content Verification

### Fashion Brand Outfits
- [ ] Emilia Wickstead
  - [ ] Primary image loads
  - [ ] Secondary image loads
  - [ ] All 4 items listed with correct prices
  - [ ] Shopping links work

- [ ] Uniqlo
  - [ ] Primary image loads
  - [ ] Secondary image loads
  - [ ] All 6 items listed with correct prices
  - [ ] Shopping links work

- [ ] Really Wild
  - [ ] Primary image loads
  - [ ] Secondary image loads
  - [ ] All 5 items listed with correct prices
  - [ ] Shopping links work

- [ ] ERDEM
  - [ ] Primary image loads
  - [ ] Secondary image loads
  - [ ] All 5 items listed with correct prices
  - [ ] Shopping links work

- [ ] Manolo Blahnik
  - [ ] Primary image loads
  - [ ] Secondary image loads
  - [ ] All 4 items listed with correct prices
  - [ ] Shopping links work

## 🧪 Functionality Testing

- [ ] Virtual try-on feature works
  - [ ] Upload photo
  - [ ] Generate model image
  - [ ] Try on outfit
  - [ ] Image generates successfully
- [ ] Navigation between pages works
- [ ] All buttons clickable
- [ ] No console errors (F12 → Console tab)
- [ ] Page loads in under 3 seconds

## 📊 Monitoring Setup

- [ ] Set up billing alerts in Google Cloud Console
- [ ] Checked Gemini API quota limits
- [ ] Bookmarked Vercel deployment dashboard
- [ ] Know how to check deployment logs

## 🎯 Final Pre-Event Checklist

**One Day Before Event:**
- [ ] Test the site end-to-end
- [ ] Verify all 5 brand outfits load
- [ ] Check site on your phone
- [ ] Have backup plan if API quota exceeded
- [ ] Note down the URL: renderedfits.com

**Day of Event:**
- [ ] Verify site is still live
- [ ] Test on venue WiFi (if possible)
- [ ] Have business cards with the URL
- [ ] Prepare 30-second pitch about the technology

## 🚨 Troubleshooting

If something doesn't work:

**Blank page:**
- Check Vercel environment variables are set
- Check deployment logs in Vercel
- Verify API key is valid

**Domain not working:**
- Wait longer for DNS propagation (up to 24 hours)
- Use https://rendered-fits.vercel.app as backup
- Check DNS records match Vercel's instructions

**Virtual try-on not working:**
- Check browser console for errors (F12)
- Verify Gemini API key has quota remaining
- Check Google Cloud Console for API status

**Images not loading:**
- Check GitHub repository is public
- Verify image file names match exactly (case-sensitive)
- Check browser console for 404 errors

## 📞 Emergency Contacts

- Vercel Support: https://vercel.com/support
- Google Cloud Support: https://cloud.google.com/support
- Domain Registrar: [Your registrar's support]

## ✅ Launch Ready

When ALL checkboxes above are checked, you're ready to showcase at your networking event!

---

**You've got this! Good luck! 🚀**
