# Visual Step-by-Step GoDaddy DNS Setup

This guide shows you exactly what to click and where.

---

## 🖥️ Step 1: Access GoDaddy DNS Management

### 1.1 Go to GoDaddy
```
Browser → https://godaddy.com → Sign In
```

### 1.2 Navigate to Your Products
```
Top Menu → My Products
(or direct link: https://account.godaddy.com/products)
```

### 1.3 Find Your Domain
Look for a box/card that says:
```
┌─────────────────────────────┐
│ renderedfits.com            │
│                             │
│ [DNS] [Email] [...]        │
└─────────────────────────────┘
```

### 1.4 Click DNS Button
Click the **DNS** button → Opens DNS Management page

---

## 🗑️ Step 2: Delete Conflicting Records

You'll see a section called "**Records**" with a table like this:

```
Type    Name    Value               TTL     Actions
─────────────────────────────────────────────────────
A       @       13.248.243.5        600     [✏️] [🗑️]
A       @       76.223.105.230      600     [✏️] [🗑️]
CNAME   ...     ...                 ...     [✏️] [🗑️]
```

### 2.1 Delete First A Record
1. Find row: `A | @ | 13.248.243.5`
2. Click the **trash icon** (🗑️) or **three dots** (•••)
3. Click **Delete** or **Remove**
4. Confirm deletion

### 2.2 Delete Second A Record
1. Find row: `A | @ | 76.223.105.230`
2. Click the **trash icon** (🗑️) or **three dots** (•••)
3. Click **Delete** or **Remove**
4. Confirm deletion

**Result:** Both old A records are now gone!

---

## ➕ Step 3: Add New A Record

### 3.1 Click Add Button
Look for a button that says **"Add"** or **"Add Record"** (usually near the top of the records table)

### 3.2 Fill in the Form
You'll see a form with these fields:

```
┌─────────────────────────────────────┐
│ Type: [Dropdown ▼]                  │ ← Select "A"
│                                     │
│ Name: [___________]                 │ ← Enter "@" (without quotes)
│                                     │
│ Value: [___________]                │ ← Enter "216.198.79.1"
│                                     │
│ TTL: [600 ▼]                        │ ← Leave as 600 or default
│                                     │
│ [Cancel]  [Save]                    │ ← Click Save
└─────────────────────────────────────┘
```

### 3.3 Exact Values to Enter

| Field | What to Enter | Example |
|-------|---------------|---------|
| **Type** | Select `A` from dropdown | A |
| **Name** | Type `@` | @ |
| **Value** | Type `216.198.79.1` | 216.198.79.1 |
| **TTL** | Leave default or `600` | 600 |

### 3.4 Click Save
Click the **Save** button at the bottom of the form.

**Success message should appear!**

---

## ➕ Step 4: Add CNAME Record

### 4.1 Click Add Button Again
Click **"Add"** or **"Add Record"** button again

### 4.2 Fill in the Form

```
┌─────────────────────────────────────┐
│ Type: [Dropdown ▼]                  │ ← Select "CNAME"
│                                     │
│ Name: [___________]                 │ ← Enter "www"
│                                     │
│ Value: [___________]                │ ← Enter the CNAME value below
│                                     │
│ TTL: [600 ▼]                        │ ← Leave as 600 or default
│                                     │
│ [Cancel]  [Save]                    │ ← Click Save
└─────────────────────────────────────┘
```

### 4.3 Exact Values to Enter

| Field | What to Enter |
|-------|---------------|
| **Type** | Select `CNAME` from dropdown |
| **Name** | Type `www` |
| **Value** | Type `6f0830412f6ebcf4.vercel-dns-017.com.` |
| **TTL** | Leave default or `600` |

**⚠️ IMPORTANT:**
- Copy the CNAME value exactly: `6f0830412f6ebcf4.vercel-dns-017.com.`
- Note the period (`.`) at the end - GoDaddy may or may not require it
- If GoDaddy gives an error, try WITHOUT the period: `6f0830412f6ebcf4.vercel-dns-017.com`

### 4.4 Click Save
Click the **Save** button.

---

## ✅ Step 5: Verify Your Records

After adding both records, your DNS table should look like this:

```
Type    Name    Value                                   TTL     Actions
──────────────────────────────────────────────────────────────────────
A       @       216.198.79.1                           600     [✏️] [🗑️]
CNAME   www     6f0830412f6ebcf4.vercel-dns-017.com.  600     [✏️] [🗑️]
```

### Visual Checklist:
- ✅ A record with @ pointing to 216.198.79.1
- ✅ CNAME record with www pointing to 6f0830412f6ebcf4.vercel-dns-017.com.
- ✅ Old A records (13.248.243.5 and 76.223.105.230) are GONE
- ✅ All changes saved (no unsaved changes warning)

---

## ⏰ Step 6: Wait for Propagation

### What happens now:

```
┌─────────────────────────────────────────────┐
│  0 min:  You save changes in GoDaddy       │
│    ↓                                        │
│ 10 min:  DNS starts propagating            │
│    ↓                                        │
│ 30 min:  Check Vercel status               │
│    ↓                                        │
│ 1-2 hr:  DNS fully propagated (typical)    │
│    ↓                                        │
│  DONE:   Site works at renderedfits.com!   │
└─────────────────────────────────────────────┘
```

### During this time:
- ☕ Get coffee/tea
- 📧 Check emails
- 🚶 Take a walk
- ⏰ Set a timer for 30 minutes

**Do NOT:**
- ❌ Keep refreshing the site (won't speed it up)
- ❌ Make more DNS changes (will restart propagation)
- ❌ Panic if it doesn't work immediately

---

## 🔍 Step 7: Check Vercel Status

### After 30+ minutes:

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Click on your **rendered-fits** project
3. Click **Settings** (top menu)
4. Click **Domains** (left sidebar)
5. Look at the status:

```
Domain                    Status
──────────────────────────────────────────
renderedfits.com         ✅ Valid Configuration
www.renderedfits.com     ✅ Valid Configuration
```

### If you see green checkmarks (✅):
**Success!** Move to Step 8.

### If you still see "Invalid Configuration" (⚠️):
1. Click the **Refresh** icon/button
2. Wait another 15-30 minutes
3. Check again

---

## 🌐 Step 8: Test Your Domain

### 8.1 Open New Browser Tab
Use an **incognito/private window** to avoid cache issues:
- **Chrome:** Ctrl+Shift+N (Windows) or Cmd+Shift+N (Mac)
- **Safari:** Cmd+Shift+N (Mac)
- **Firefox:** Ctrl+Shift+P (Windows) or Cmd+Shift+P (Mac)

### 8.2 Test renderedfits.com
Type in address bar:
```
https://renderedfits.com
```
Press Enter.

**Expected result:**
```
┌─────────────────────────────────────────┐
│  🔒 renderedfits.com                   │ ← Padlock icon
│                                         │
│  [Your Virtual Try-On Site Loads]      │
│  - Fashion brand outfits visible       │
│  - Images load correctly               │
│  - Navigation works                    │
└─────────────────────────────────────────┘
```

### 8.3 Test www.renderedfits.com
Type in address bar:
```
https://www.renderedfits.com
```
Press Enter.

**Expected result:** Same as above - site loads perfectly!

---

## 🎉 Success Indicators

You're done when you see ALL of these:

### In Browser:
- ✅ **Padlock icon** (🔒) in address bar
- ✅ **URL shows:** https://renderedfits.com
- ✅ **Site loads** with all fashion brands
- ✅ **No security warnings**

### In Vercel:
- ✅ **renderedfits.com:** "Valid Configuration"
- ✅ **www.renderedfits.com:** "Valid Configuration"
- ✅ **Green checkmarks** on both domains

### Site Works:
- ✅ All 5 fashion brand outfits visible
- ✅ Images load correctly
- ✅ Navigation functional
- ✅ Product pages accessible

---

## 🚨 Common Issues & Visual Fixes

### Issue 1: Can't Find the Add Button

**Look for these:**
- Button labeled "Add Record" or "Add"
- Plus icon (+)
- Usually at top or bottom of records table

**Can't find it?** Try:
- Scroll to top of page
- Scroll to bottom of page
- Look for a floating action button

---

### Issue 2: GoDaddy Shows "Conflicting Records" Warning

**You'll see:**
```
⚠️ Warning: Conflicting records detected
This may prevent your domain from working correctly.
```

**Fix:**
1. Read which records are conflicting
2. Delete those specific records
3. Try adding your new record again

---

### Issue 3: CNAME Value Error

**Error message:**
```
❌ Invalid CNAME target
```

**Try these variations:**
1. **With period:** `6f0830412f6ebcf4.vercel-dns-017.com.`
2. **Without period:** `6f0830412f6ebcf4.vercel-dns-017.com`
3. **Add your domain:** `6f0830412f6ebcf4.vercel-dns-017.com.renderedfits.com`

Usually option 1 or 2 works!

---

### Issue 4: Site Loads But Shows Wrong Content

**You might see:**
```
┌─────────────────────────────────────┐
│  Domain is for sale                │
│  or                                │
│  Parked domain page                │
└─────────────────────────────────────┘
```

**Fix:**
1. In GoDaddy, click **Forwarding** tab
2. Delete any domain forwarding rules
3. Go back to DNS settings
4. Verify your A and CNAME records are still there
5. Wait 15 more minutes

---

## 📱 Mobile Testing

After desktop works, test on mobile:

1. **Pull up site on your phone**
2. **Type:** https://renderedfits.com
3. **Check:**
   - ✅ Site loads
   - ✅ Responsive design works
   - ✅ Images display
   - ✅ Touch navigation works

---

## 🎯 Final Checklist

Print this and check off as you go:

```
□ Logged into GoDaddy
□ Opened DNS Management for renderedfits.com
□ Deleted A record: @ → 13.248.243.5
□ Deleted A record: @ → 76.223.105.230
□ Added A record: @ → 216.198.79.1
□ Added CNAME: www → 6f0830412f6ebcf4.vercel-dns-017.com.
□ Saved all changes
□ Waited 30+ minutes
□ Checked Vercel (shows "Valid Configuration")
□ Tested https://renderedfits.com (works!)
□ Tested https://www.renderedfits.com (works!)
□ Verified HTTPS padlock icon appears
□ All 5 fashion brands visible
□ Tested on mobile device
```

---

## 🎓 What You Just Did

Congratulations! You just:

1. ✅ Configured DNS records in GoDaddy
2. ✅ Connected your custom domain to Vercel
3. ✅ Set up automatic HTTPS/SSL
4. ✅ Made your site accessible at renderedfits.com

**Your virtual try-on platform is now live on your custom domain!** 🚀

---

**Need more help?** See [GODADDY_DNS_SETUP.md](GODADDY_DNS_SETUP.md) for detailed troubleshooting.
