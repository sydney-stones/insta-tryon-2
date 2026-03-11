import { BlogPost } from '../types';

const post: BlogPost = {
  slug: 'how-to-set-up-virtual-try-on-shopify',
  title: 'How to Set Up Virtual Try-On on Your Shopify Store in Under 2 Hours',
  meta_description: 'Step-by-step guide to adding virtual try-on to your Shopify fashion store. Install, configure, and launch AI virtual try-on with no coding required.',
  keyword: 'how to set up virtual try-on Shopify',
  author: 'Sydney',
  date: '2026-03-09',
  updated: '2026-03-09',
  category: 'How-To Guide',
  pillar: false,
  reading_time: 7,
  content: `
## How to Add Virtual Try-On to Your Shopify Store

Adding virtual try-on to a Shopify store does not require a developer, custom code, or complex integration. For most fashion brands, the setup process takes 1–2 hours from start to first live try-on.

This guide walks through the complete process using Rendered Fits — the AI virtual try-on platform purpose-built for Shopify fashion brands.

---

## Before You Start: Checklist

Confirm the following before beginning installation:

- **Shopify store**: Active Shopify store on any plan (Basic, Shopify, Advanced, Plus)
- **Product photography**: Clean product images for the products you want to enable try-on on (existing photos are fine — no re-shooting needed)
- **Photo format**: JPG or PNG. Minimum 800×800px. Clean background preferred (white, grey, or neutral).
- **Time available**: 1–2 hours uninterrupted

---

## Step 1: Install from Shopify App Store (10 minutes)

1. Open the Shopify App Store and search for **Rendered Fits**
2. Click **Add App**
3. Review the permissions requested (product data access, storefront widget injection)
4. Click **Install App**
5. You will be redirected to the Rendered Fits onboarding dashboard

**What happens at install:** Rendered Fits injects a lightweight widget script into your storefront. This does not modify your theme files and can be removed by uninstalling the app.

---

## Step 2: Select Which Products to Enable (15 minutes)

In the Rendered Fits dashboard:

1. Navigate to **Products**
2. You will see your Shopify product catalogue automatically synced
3. Toggle on the products you want to enable virtual try-on for
4. Start with your **top 10–20 bestsellers** — these will show the fastest ROI

**Tip:** Prioritise products with the highest return rates first. Check your Shopify Analytics → Orders → Returns for return rate by product.

---

## Step 3: Configure the Widget (20 minutes)

Navigate to **Widget Settings** in the dashboard.

### Placement
Choose where the "Try On" button appears on your product page:
- **Below Add to Cart** (recommended — highest visibility, not competing with CTA)
- **Above Add to Cart** (good for stores where try-on is a primary selling point)
- **In product image gallery** (good for mobile-first stores)

### Styling
Match the button to your brand:
- Button text: customise ("Virtual Try On", "Try This On", "See It On You")
- Button colour: enter your brand hex code
- Button border radius: match your existing CTA style
- Font: inherits from your theme by default

### Consent and Privacy Copy
The GDPR consent flow is included by default. Customise the copy:
- Consent heading: "Try this on"
- Consent body: "Upload a photo to see this on you. Your photo is processed securely and deleted within 24 hours."
- Button: "Upload Photo"

**Do not remove the consent copy.** It is legally required under GDPR and CCPA for photo processing.

---

## Step 4: Set Up the Consent Flow (15 minutes)

Rendered Fits includes a pre-built GDPR-compliant consent modal. Review and confirm:

1. In **Settings → Privacy**, confirm:
   - Consent modal is enabled (required)
   - Photo retention policy is set to "Delete after processing" (default)
   - Your privacy policy URL is entered (so customers can click through)

2. Verify your privacy policy mentions photo processing for virtual try-on. Add this sentence if it's not there:

   *"When you use our virtual try-on feature, we process your uploaded photo using AI to generate a try-on image. Your photo is processed transiently and permanently deleted within 24 hours of upload. We do not store, profile, or share your photos."*

---

## Step 5: Test Before Going Live (20 minutes)

Before enabling for customers, test on your own store:

1. In Rendered Fits dashboard, click **Preview Mode**
2. Navigate to a product page in your live store
3. Click the try-on button
4. Upload a test photo (yourself, or any clear photo of a person)
5. Confirm:
   - Consent modal appears correctly
   - Photo upload works on desktop and mobile
   - Result image generates within 60 seconds
   - Result image looks photorealistic
   - Download/share option is visible

**Test on mobile too.** Open the product page on your phone. Most try-on sessions will be mobile.

---

## Step 6: Configure Customer-Facing Messaging (15 minutes)

Customers need context for what virtual try-on is. Add supporting copy to your product pages:

### Option A: Product description add-on
Add at the top of product descriptions for enabled products:
*"Try this on virtually — upload a photo to see how it looks on you before you buy."*

### Option B: Product page feature callout
If your theme supports a feature callout area, add:
*"✓ Virtual try-on available — see it on you in seconds"*

### Option C: Store-wide banner or homepage section
For stores where virtual try-on is a key differentiator, announce it site-wide:
*"New: Virtual Try-On — see our pieces on you before you buy"*

---

## Step 7: Go Live and Monitor (10 minutes setup, ongoing)

1. In Rendered Fits dashboard, click **Go Live** to enable for all customers
2. Set up your analytics tracking:
   - **Try-on adoption rate**: % of product page visitors who click Try On (target: 20–40% by week 4)
   - **Try-on conversion rate**: % of try-on sessions that add to cart within 30 minutes
   - **Try-on vs. control return rate**: compare return rate of orders from try-on sessions vs. without

3. Check your Shopify Analytics in 7 days for initial conversion data

---

## Troubleshooting Common Issues

**The Try On button isn't appearing on product pages**
- Check the widget is enabled for that product (Products tab in dashboard)
- Check there are no theme conflicts (some heavily customised themes may require CSS adjustment — contact Rendered Fits support)
- Clear your browser cache and reload

**The try-on result doesn't look realistic**
- Check the product image quality (minimum 800×800px, clean background)
- Test with a different product image
- Ensure the product is a supported garment type (tops, dresses, outerwear — not footwear or accessories for best results)

**Customers can't upload photos on mobile**
- Confirm the mobile camera permission prompt is appearing
- Test on both iOS Safari and Android Chrome
- If issues persist, contact Rendered Fits support with device and browser details

**Processing takes longer than 60 seconds**
- Occasional delays during peak traffic periods
- If consistent, contact support — may indicate a configuration issue

---

## Post-Launch Optimisation

After 2–4 weeks live, review your analytics:

**If adoption rate is below 15%:**
- Move the button higher on the product page
- Add the feature callout text to product descriptions
- Add a homepage or collection page banner explaining the feature

**If conversion rate improvement is below 10%:**
- Review your product photography quality (blurry or low-contrast images reduce result quality)
- Check which garment categories have highest try-on engagement vs. lowest — disable try-on for categories where it's not improving metrics

**If return rate on try-on orders hasn't reduced after 60 days:**
- Add expectation-setting copy: "This gives you an idea of how the style will look — for size guidance, see our size chart"
- Ensure consent modal clearly communicates the illustrative nature of results

---

## Frequently Asked Questions

**Q: How long does it take to set up virtual try-on on Shopify?**

A: Most Shopify fashion brands complete setup in 1–2 hours using Rendered Fits. The process involves installing from the Shopify App Store, selecting products, configuring the widget, and testing — all through a no-code dashboard.

**Q: Do I need a developer to add virtual try-on to Shopify?**

A: No. Rendered Fits installs directly from the Shopify App Store with no coding required. The widget is injected automatically into your storefront without modifying theme files.

**Q: Does virtual try-on work with my existing product photos?**

A: Yes. Rendered Fits works from your existing product photography — you do not need to re-shoot your catalogue. JPG or PNG images at 800×800px minimum work well. Clean backgrounds produce better results.

**Q: Is Shopify virtual try-on GDPR compliant?**

A: Yes. Rendered Fits includes a built-in GDPR-compliant consent flow. Customer photos are processed transiently and permanently deleted within 24 hours of upload. A Data Processing Agreement is available on request.

**Q: How much does it cost to add virtual try-on to Shopify?**

A: Rendered Fits starts at £249/month for up to 1,000 virtual try-ons per month. Higher volume plans are available at £449/month (2,000 try-ons), £749/month (3,500 try-ons), and £1,249/month (6,000 try-ons). Enterprise pricing is available for custom requirements.

**Q: Can I try virtual try-on before committing to a paid plan?**

A: Yes. Contact the Rendered Fits team at renderedfits.com to request a trial or demo before subscribing.
`,
};

export default post;
