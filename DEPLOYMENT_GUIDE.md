# Rendered Fits - Secure Deployment Guide

This guide will walk you through deploying your virtual try-on website securely to Vercel with your custom domain **renderedfits.com**.

## Current Issues & Solutions

### Issue 1: Blank Page on Vercel
Your site is currently blank because the Gemini API key environment variable is not configured in Vercel. The application fails to initialize without it.

### Issue 2: Security Concerns
The Gemini API key must NEVER be committed to GitHub. We'll use Vercel's environment variables to keep it secure.

---

## Step-by-Step Deployment Instructions

### 1. Get Your Gemini API Key

If you don't already have one:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key (you'll need it in the next steps)

**IMPORTANT:** Keep this key private! Never share it or commit it to GitHub.

---

### 2. Configure Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your project `rendered-fits` (or whatever it's named)
3. Click on the project to open it
4. Click **"Settings"** in the top navigation bar
5. Click **"Environment Variables"** in the left sidebar
6. Add the following environment variable:
   - **Key:** `VITE_GEMINI_API_KEY`
   - **Value:** [Paste your Gemini API key here]
   - **Environment:** Check all three boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
7. Click **"Save"**

---

### 3. Redeploy Your Application

After adding the environment variable:

1. Go to the **"Deployments"** tab in your Vercel project
2. Find the most recent deployment
3. Click the three dots (•••) on the right side
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again

Alternatively, you can push a new commit to GitHub to trigger a deployment:

```bash
git add .
git commit -m "Update deployment configuration"
git push origin main
```

---

### 4. Set Up Your Custom Domain (renderedfits.com)

#### Step A: Add Domain in Vercel

1. In your Vercel project, click **"Settings"**
2. Click **"Domains"** in the left sidebar
3. In the "Add Domain" field, enter: `renderedfits.com`
4. Click **"Add"**
5. Repeat for the `www` subdomain:
   - Enter: `www.renderedfits.com`
   - Click **"Add"**

Vercel will show you DNS records that need to be configured.

#### Step B: Configure DNS Records

You need to update your domain registrar's DNS settings. Vercel will provide specific records, but here's the general format:

**For the root domain (renderedfits.com):**
- **Type:** A
- **Name:** `@` (or leave blank)
- **Value:** `76.76.21.21` (Vercel's IP)

**For the www subdomain (www.renderedfits.com):**
- **Type:** CNAME
- **Name:** `www`
- **Value:** `cname.vercel-dns.com`

**Where to find your registrar's DNS settings:**
- If you bought your domain from **GoDaddy**: Go to "My Products" → Click on your domain → "Manage DNS"
- If you bought from **Namecheap**: Go to "Domain List" → Click "Manage" → "Advanced DNS"
- If you bought from **Google Domains**: Go to "My Domains" → Click your domain → "DNS"

#### Step C: Wait for DNS Propagation

After updating DNS records:
- DNS changes can take 24-48 hours to fully propagate (usually much faster, often 1-2 hours)
- You can check the status in Vercel under Settings → Domains
- Vercel will automatically provision SSL certificates (HTTPS) once DNS is verified

---

### 5. Verify Your Deployment

Once DNS is configured and the site has been redeployed:

1. Visit `https://renderedfits.com`
2. The site should load with all your fashion brand outfits
3. Verify that the virtual try-on functionality works

---

## Security Checklist ✅

- [x] `.env` files are in `.gitignore` (prevents accidental commits)
- [x] API key is stored in Vercel environment variables only
- [x] No sensitive keys are in the GitHub repository
- [x] HTTPS is automatically enabled by Vercel
- [ ] API key is set in Vercel (you need to do this)
- [ ] Site has been redeployed with environment variables

---

## Local Development Setup

If you want to run the site locally for testing:

1. Create a `.env` file in the root directory (this is safe, it's in `.gitignore`):
   ```bash
   echo "VITE_GEMINI_API_KEY=your_actual_api_key_here" > .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173)

**IMPORTANT:** Never commit the `.env` file to GitHub!

---

## Alternative: Better Image Storage

Currently, you're storing images in your GitHub repository. For a production site, consider these better alternatives:

### Option 1: Vercel Blob Storage (Recommended)
- Free tier: 500MB storage
- Fast CDN delivery
- Integrates seamlessly with Vercel
- [Setup Guide](https://vercel.com/docs/storage/vercel-blob)

### Option 2: Cloudinary (Free Tier Available)
- Free tier: 25GB storage, 25GB bandwidth/month
- Image optimization and transformations
- Global CDN
- [Sign up](https://cloudinary.com/)

### Option 3: AWS S3 + CloudFront
- Pay-as-you-go pricing (very cheap for small sites)
- Highly scalable
- Requires more setup

For now, GitHub works fine for your demo, but consider migrating if the site gets heavy traffic.

---

## Troubleshooting

### "Site still shows blank page after adding environment variables"
1. Make sure you clicked "Redeploy" after adding the environment variable
2. Check the deployment logs in Vercel for errors
3. Verify the environment variable name is exactly: `VITE_GEMINI_API_KEY`

### "Domain not working"
1. Check DNS propagation: [https://dnschecker.org](https://dnschecker.org)
2. Verify DNS records match exactly what Vercel provided
3. Wait 24-48 hours for full propagation

### "HTTPS/SSL not working"
1. Vercel automatically provisions SSL once DNS is verified
2. This can take a few minutes after DNS verification
3. Don't try to configure SSL manually - Vercel handles this

### "API key not working"
1. Verify the key is valid in [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Check that you copied the entire key with no extra spaces
3. Ensure billing is enabled on your Google Cloud account (Gemini API requires it)

---

## Cost Considerations

### Vercel Hosting
- **Hobby Plan:** FREE
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Perfect for your use case

### Gemini API
- **Pricing varies by model**
- The model used: `gemini-2.5-flash-image-preview`
- Monitor usage in [Google Cloud Console](https://console.cloud.google.com/)
- Set up billing alerts to avoid surprises

---

## Next Steps After Deployment

1. Test all functionality on the live site
2. Share `https://renderedfits.com` at your networking event
3. Monitor API usage to track costs
4. Consider adding Google Analytics to track visitor engagement
5. Set up a contact form for brand inquiries

---

## Support

If you encounter issues:
- **Vercel Support:** [https://vercel.com/support](https://vercel.com/support)
- **Gemini API Docs:** [https://ai.google.dev/docs](https://ai.google.dev/docs)
- **DNS Issues:** Contact your domain registrar's support

---

Good luck with your fashion networking event! 🎉
