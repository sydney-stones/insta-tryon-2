# Shopify App Migration Guide

## Overview
This guide will help you transform your Virtual Try-On demo into a production Shopify app that fashion brands can install and pay for.

---

## Phase 1: Clone & Prepare Repository

### Step 1: Clone Your Current Repository

```bash
# Navigate to your projects directory
cd ~/projects

# Clone the repository to a new location
git clone https://github.com/sydney-stones/insta-tryon-2 insta-tryon-shopify

# Navigate to the new directory
cd insta-tryon-shopify

# Create a new branch for Shopify development
git checkout -b shopify-app-development

# Optional: Create a new remote repository for the Shopify version
# git remote set-url origin https://github.com/YOUR-USERNAME/virtual-tryon-shopify-app
```

### Step 2: Backup Current Demo

```bash
# Tag the current state before migration
git tag -a demo-v1.0 -m "Demo version before Shopify migration"
git push origin demo-v1.0
```

---

## Phase 2: Choose Your Shopify Integration Path

You have **3 main options** for monetizing your Virtual Try-On technology:

### Option A: Shopify App (Recommended for SaaS)
**Best for:** Recurring revenue, app store distribution, multi-brand scaling

**Pros:**
- Listed in Shopify App Store (free marketing)
- Built-in billing through Shopify
- Easy installation for brands
- Recurring subscription revenue
- Shopify handles authentication & security

**Cons:**
- 20% revenue share to Shopify (on subscriptions over $1M/year)
- Must follow Shopify's app guidelines
- More complex initial setup

### Option B: Custom Storefront Integration
**Best for:** White-label solutions, enterprise clients

**Pros:**
- No revenue share
- Full control over pricing
- Direct client relationships
- Can charge premium prices

**Cons:**
- Manual integration for each client
- You handle all support & hosting
- No app store discoverability

### Option C: Hybrid Approach
**Best for:** Maximum flexibility

- Shopify App for small/medium brands (Starter → Premium tiers)
- Custom integration for enterprise clients (Enterprise tier)

---

## Phase 3: Shopify App Development (Recommended Path)

### Architecture Overview

```
┌─────────────────────────────────────────────────┐
│           Shopify App Architecture              │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐      ┌──────────────┐        │
│  │   Frontend   │      │   Backend    │        │
│  │  (Embedded   │◄────►│  (Node.js/   │        │
│  │   React)     │      │   Express)   │        │
│  └──────────────┘      └──────────────┘        │
│         │                      │                │
│         │                      │                │
│         ▼                      ▼                │
│  ┌──────────────┐      ┌──────────────┐        │
│  │   Shopify    │      │   Database   │        │
│  │  Admin API   │      │  (PostgreSQL)│        │
│  └──────────────┘      └──────────────┘        │
│         │                      │                │
│         └──────────┬───────────┘                │
│                    │                            │
│                    ▼                            │
│         ┌──────────────────┐                   │
│         │  AI Try-On API   │                   │
│         │ (Google Gemini)  │                   │
│         └──────────────────┘                   │
└─────────────────────────────────────────────────┘
```

### Step 1: Set Up Shopify Partner Account

1. **Create Partner Account:**
   - Go to https://partners.shopify.com/
   - Sign up for free
   - Complete your profile

2. **Create Development Store:**
   - In Partner Dashboard → Stores → Add store
   - Choose "Development store"
   - This is your testing environment

### Step 2: Initialize Shopify App

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/app

# Create new Shopify app (in a NEW directory)
cd ~/projects
shopify app init virtual-tryon-app

# Choose options:
# - App type: Custom app
# - Language: Node (or Remix if you prefer)
# - Template: Remix (modern, recommended)
```

### Step 3: Project Structure

```
virtual-tryon-shopify-app/
├── app/                          # Frontend (React/Remix)
│   ├── routes/                   # App pages
│   │   ├── app._index.tsx       # Dashboard
│   │   ├── app.products.tsx     # Product selection
│   │   ├── app.settings.tsx     # Settings page
│   │   └── app.analytics.tsx    # Usage analytics
│   ├── components/              # Reusable components
│   │   ├── VirtualTryOn.tsx     # Your try-on component
│   │   ├── ROICalculator.tsx    # Migrated from demo
│   │   └── ProductSelector.tsx  # Select products to enable
│   └── styles/                  # CSS/Tailwind
├── extensions/                   # Shopify extensions
│   └── product-tryon/           # Storefront widget
│       ├── assets/
│       ├── blocks/
│       │   └── tryon-button.liquid
│       └── snippets/
├── prisma/                      # Database schema
│   └── schema.prisma
├── app/                         # Backend (Node.js/Remix)
│   ├── db.server.ts            # Database client
│   ├── shopify.server.ts       # Shopify API client
│   └── models/                 # Data models
│       ├── subscription.ts
│       ├── usage.ts
│       └── settings.ts
└── public/                      # Static assets
    └── widget/                  # Embeddable widget
```

---

## Phase 4: Migrate Your Code

### 4.1: Migrate Core Try-On Component

Create `app/components/VirtualTryOn.tsx`:

```typescript
import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';

interface VirtualTryOnProps {
  productId: string;
  productImage: string;
  shopDomain: string;
}

export function VirtualTryOn({ productId, productImage, shopDomain }: VirtualTryOnProps) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleTryOn = async () => {
    setIsProcessing(true);

    try {
      // Call your Gemini API (via your backend)
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userImage,
          productImage,
          productId,
          shopDomain
        })
      });

      const data = await response.json();
      setResult(data.resultImage);

      // Track usage for billing
      await fetch('/api/track-usage', {
        method: 'POST',
        body: JSON.stringify({ shopDomain, productId })
      });
    } catch (error) {
      console.error('Try-on failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="virtual-tryon-container">
      {/* Your existing UI code here */}
    </div>
  );
}
```

### 4.2: Create Storefront Extension (The Widget)

Create `extensions/product-tryon/blocks/tryon-button.liquid`:

```liquid
{% schema %}
{
  "name": "Virtual Try-On Button",
  "target": "section",
  "settings": [
    {
      "type": "text",
      "id": "button_text",
      "label": "Button Text",
      "default": "Virtual Try-On"
    },
    {
      "type": "color",
      "id": "button_color",
      "label": "Button Color",
      "default": "#000000"
    }
  ]
}
{% endschema %}

<div class="virtual-tryon-widget" data-product-id="{{ product.id }}">
  <button
    class="virtual-tryon-button"
    style="background-color: {{ block.settings.button_color }}"
    onclick="openVirtualTryOn()"
  >
    {{ block.settings.button_text }}
  </button>
</div>

<script src="{{ 'virtual-tryon.js' | asset_url }}" defer></script>

<style>
  .virtual-tryon-button {
    /* Your button styles */
  }
</style>
```

### 4.3: Create Backend API Routes

Create `app/routes/api.try-on.tsx`:

```typescript
import { json } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { authenticate } from '../shopify.server';
import { processVirtualTryOn } from '../services/gemini.server';
import { trackUsage } from '../services/billing.server';

export const action: ActionFunction = async ({ request }) => {
  const { session } = await authenticate.public.appProxy(request);

  const { userImage, productImage, productId, shopDomain } = await request.json();

  // Check subscription & usage limits
  const subscription = await getSubscription(shopDomain);
  if (!subscription || !subscription.active) {
    return json({ error: 'No active subscription' }, { status: 403 });
  }

  const usage = await checkUsageLimit(shopDomain, subscription.tier);
  if (usage.exceeded) {
    return json({ error: 'Usage limit exceeded' }, { status: 429 });
  }

  // Process virtual try-on
  const result = await processVirtualTryOn({
    userImage,
    productImage,
    apiKey: process.env.GEMINI_API_KEY!
  });

  // Track usage for billing
  await trackUsage({
    shopDomain,
    productId,
    tier: subscription.tier,
    timestamp: new Date()
  });

  return json({ resultImage: result });
};
```

---

## Phase 5: Implement Billing & Subscriptions

### 5.1: Define Subscription Tiers

Create `app/config/pricing.ts`:

```typescript
export const PRICING_TIERS = {
  STARTER: {
    name: 'Starter',
    price: 900, // £900/month in pence
    interval: 'EVERY_30_DAYS',
    tryOnsIncluded: 3000,
    overageFee: 0.08,
    features: [
      '3,000 try-ons/month',
      'Brand dashboard',
      'Basic analytics',
      'Email support'
    ]
  },
  GROWTH: {
    name: 'Growth',
    price: 2000,
    interval: 'EVERY_30_DAYS',
    tryOnsIncluded: 10000,
    overageFee: 0.08,
    features: [
      '10,000 try-ons/month',
      'Advanced analytics',
      'Priority support',
      'Custom branding'
    ]
  },
  PREMIUM: {
    name: 'Premium',
    price: 4200,
    interval: 'EVERY_30_DAYS',
    tryOnsIncluded: 25000,
    overageFee: 0.08,
    features: [
      '25,000 try-ons/month',
      'Full API access',
      'Dedicated support',
      'White-label option'
    ]
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 7500,
    interval: 'EVERY_30_DAYS',
    tryOnsIncluded: 50000,
    overageFee: 0.08,
    features: [
      '50,000+ try-ons/month',
      'Custom integration',
      'SLA guarantee',
      'Phone support'
    ]
  }
} as const;
```

### 5.2: Create Billing Service

Create `app/services/billing.server.ts`:

```typescript
import { shopifyApi } from '@shopify/shopify-api';

export async function createSubscription(
  shopDomain: string,
  tier: keyof typeof PRICING_TIERS
) {
  const client = new shopifyApi.clients.Graphql({ session });

  const response = await client.query({
    data: {
      query: `
        mutation CreateSubscription($name: String!, $price: Decimal!) {
          appSubscriptionCreate(
            name: $name
            lineItems: [{
              plan: {
                appRecurringPricingDetails: {
                  price: { amount: $price, currencyCode: GBP }
                  interval: EVERY_30_DAYS
                }
              }
            }]
            returnUrl: "${process.env.APP_URL}/billing/confirm"
          ) {
            appSubscription {
              id
            }
            confirmationUrl
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        name: PRICING_TIERS[tier].name,
        price: PRICING_TIERS[tier].price / 100
      }
    }
  });

  return response.body.data.appSubscriptionCreate;
}

export async function trackUsage(data: UsageData) {
  // Store in database
  await prisma.usage.create({
    data: {
      shopDomain: data.shopDomain,
      productId: data.productId,
      tier: data.tier,
      timestamp: data.timestamp
    }
  });

  // Check if overage charges needed
  const monthlyUsage = await getMonthlyUsage(data.shopDomain);
  const subscription = await getSubscription(data.shopDomain);

  if (monthlyUsage > subscription.tryOnsIncluded) {
    await chargeOverage(data.shopDomain, monthlyUsage - subscription.tryOnsIncluded);
  }
}
```

---

## Phase 6: Database Setup

### 6.1: Create Prisma Schema

Create `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Shop {
  id              String   @id @default(cuid())
  shopDomain      String   @unique
  accessToken     String
  subscription    Subscription?
  usage           Usage[]
  settings        Settings?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Subscription {
  id              String   @id @default(cuid())
  shop            Shop     @relation(fields: [shopId], references: [id])
  shopId          String   @unique
  tier            String   // STARTER, GROWTH, PREMIUM, ENTERPRISE
  status          String   // ACTIVE, CANCELLED, EXPIRED
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  tryOnsUsed      Int      @default(0)
  tryOnsIncluded  Int
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Usage {
  id          String   @id @default(cuid())
  shop        Shop     @relation(fields: [shopId], references: [id])
  shopId      String
  productId   String
  timestamp   DateTime @default(now())

  @@index([shopId, timestamp])
}

model Settings {
  id              String   @id @default(cuid())
  shop            Shop     @relation(fields: [shopId], references: [id])
  shopId          String   @unique
  buttonColor     String   @default("#000000")
  buttonText      String   @default("Virtual Try-On")
  enabledProducts String[] // Array of product IDs
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### 6.2: Set Up Database

```bash
# Set up PostgreSQL (choose one):

# Option 1: Local PostgreSQL
brew install postgresql
brew services start postgresql
createdb virtual-tryon-db

# Option 2: Managed service (recommended for production)
# - Railway: https://railway.app/
# - Supabase: https://supabase.com/
# - Heroku Postgres
# - AWS RDS

# Set DATABASE_URL in .env
echo "DATABASE_URL=postgresql://user:password@localhost:5432/virtual-tryon-db" >> .env

# Run migrations
npx prisma migrate dev --name init
npx prisma generate
```

---

## Phase 7: Deploy Your App

### 7.1: Choose Hosting Provider

**Recommended Options:**

1. **Shopify Oxygen** (Shopify's hosting)
   - Pros: Integrated, optimized for Shopify
   - Cons: Newer platform

2. **Vercel** (Recommended)
   - Pros: Easy deployment, great DX, free tier
   - Cons: Cold starts on free tier

3. **Railway** / **Render**
   - Pros: Full backend support, PostgreSQL included
   - Cons: Paid plans required

### 7.2: Deploy to Vercel (Example)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - DATABASE_URL
# - SHOPIFY_API_KEY
# - SHOPIFY_API_SECRET
# - GEMINI_API_KEY
# - APP_URL

# Deploy to production
vercel --prod
```

### 7.3: Configure Shopify App URLs

In Partner Dashboard → Apps → Your App → App setup:

```
App URL: https://your-app.vercel.app
Allowed redirection URLs: https://your-app.vercel.app/auth/callback
```

---

## Phase 8: App Store Submission

### 8.1: Pre-Submission Checklist

- [ ] App works in development store
- [ ] All features tested thoroughly
- [ ] Billing integration functional
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] Support documentation written
- [ ] App screenshots prepared (5-7 images)
- [ ] App description written
- [ ] Pricing clearly stated

### 8.2: Submit to Shopify App Store

1. **In Partner Dashboard:**
   - Apps → Your App → Distribution
   - Click "Create app listing"

2. **Complete App Listing:**
   - App name: "Virtual Try-On AI"
   - Tagline: "Boost sales by 30% with AI-powered virtual try-on"
   - Description: Use your ROI calculator data!
   - Screenshots: Show the try-on process
   - Video demo: Record a quick walkthrough

3. **Set Pricing:**
   - Add all your tiers (Starter, Growth, Premium, Enterprise)
   - Enable usage charges for overage fees

4. **Submit for Review:**
   - Shopify reviews in 5-7 business days
   - Be ready to address feedback

---

## Phase 9: Marketing & Growth

### 9.1: Launch Strategy

**Week 1-2: Soft Launch**
- Install on your own store
- Invite 5-10 beta testers from your network
- Collect feedback, fix bugs

**Week 3-4: Public Launch**
- Submit to Shopify App Store
- Post on:
  - Twitter/X
  - LinkedIn
  - Product Hunt
  - Reddit (r/shopify, r/ecommerce)

**Month 2+: Growth**
- Content marketing (blog posts about VTO)
- Case studies from beta users
- Paid ads (Facebook, Google)
- Reach out to fashion brands directly

### 9.2: Pricing Strategy

**Launch Offer:**
- 14-day free trial (you already have this in UI!)
- 20% off first 3 months for early adopters
- No credit card required for trial

**Upsell Strategy:**
- Start brands on Starter tier
- Show ROI dashboard
- Auto-suggest upgrade when they hit 80% of limit

---

## Phase 10: Best Practices & Tips

### Security
- [ ] Never expose API keys in frontend code
- [ ] Use environment variables for all secrets
- [ ] Implement rate limiting on API endpoints
- [ ] Validate all user inputs
- [ ] Use HTTPS everywhere

### Performance
- [ ] Cache product images
- [ ] Optimize image uploads (compress, resize)
- [ ] Use CDN for static assets
- [ ] Implement lazy loading
- [ ] Monitor API response times

### Support
- [ ] Set up Intercom or Crisp chat
- [ ] Create detailed documentation
- [ ] Video tutorials for installation
- [ ] FAQ page
- [ ] Email support: support@yourdomain.com

### Analytics
- [ ] Track key metrics:
  - Installations
  - Active users
  - Try-ons per month
  - Conversion rate improvements
  - Churn rate
- [ ] Use Mixpanel or Amplitude
- [ ] Monitor server costs vs revenue

### Compliance
- [ ] GDPR compliance (if targeting EU)
- [ ] User data handling policy
- [ ] Image storage policy (delete after X days?)
- [ ] Terms of service
- [ ] Privacy policy

---

## Resources & Learning

### Official Docs
- [Shopify App Development](https://shopify.dev/apps)
- [Shopify CLI](https://shopify.dev/apps/tools/cli)
- [App Billing API](https://shopify.dev/apps/billing)

### Tutorials
- [Shopify App Tutorial](https://shopify.dev/apps/getting-started)
- [Remix + Shopify](https://remix.run/docs)
- [Prisma Docs](https://www.prisma.io/docs)

### Communities
- [Shopify Dev Discord](https://discord.gg/shopifydevs)
- [Shopify Community Forums](https://community.shopify.com/)
- [r/shopify](https://reddit.com/r/shopify)

---

## Next Steps

1. **This Week:**
   - Clone repository to new location
   - Set up Shopify Partner account
   - Create development store
   - Initialize new Shopify app project

2. **Next 2 Weeks:**
   - Migrate core try-on component
   - Set up database
   - Implement basic billing
   - Test in development store

3. **Next Month:**
   - Complete all features
   - Beta test with real brands
   - Submit to App Store
   - Prepare marketing materials

---

## Questions?

If you need help with any step, refer to:
- Shopify Developer Docs: https://shopify.dev
- This repository's issues section
- Shopify Community Forums

Good luck building your Shopify app! 🚀

---

*Last updated: October 2024*
