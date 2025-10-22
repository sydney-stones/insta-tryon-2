# GoDaddy DNS Setup for renderedfits.com - Foolproof Guide

## 🎯 Goal
Connect your GoDaddy domain **renderedfits.com** to your Vercel website.

---

## 📋 Step-by-Step Instructions

### Step 1: Log into GoDaddy

1. Go to [https://godaddy.com](https://godaddy.com)
2. Click **Sign In** (top right)
3. Enter your GoDaddy account credentials
4. Click **Sign In**

---

### Step 2: Access DNS Management

1. Click **My Products** (or go to https://account.godaddy.com/products)
2. Find **renderedfits.com** in your domain list
3. Click the **DNS** button next to it
   - Or click the three dots (•••) → **Manage DNS**

You should now see a page titled "DNS Management for renderedfits.com"

---

### Step 3: Remove Conflicting DNS Records

Vercel detected **2 conflicting A records** that need to be removed.

**Look for these records in the "Records" section:**

| Type | Name | Value/Points to |
|------|------|-----------------|
| A | @ | 13.248.243.5 |
| A | @ | 76.223.105.230 |

**To delete each one:**
1. Find the record in the list
2. Click the **Pencil icon** (edit) or **three dots** (•••) on the right side
3. Click **Delete** or the **Trash icon**
4. Confirm deletion when prompted
5. Repeat for the second conflicting A record

**Important:** Delete BOTH of these A records before proceeding!

---

### Step 4: Add the Correct A Record

Now add the **new A record** that Vercel requires:

1. Click the **Add** button (usually says "ADD" at the top of the records list)
2. Select **Type:** `A`
3. Fill in the fields:
   - **Name:** `@` (or leave blank - this represents the root domain)
   - **Value/Points to:** `216.198.79.1`
   - **TTL:** `600` (or leave default - 10 minutes is fine)
4. Click **Save**

---

### Step 5: Add the CNAME Record for www

Now add the **CNAME record** for the www subdomain:

1. Click the **Add** button again
2. Select **Type:** `CNAME`
3. Fill in the fields:
   - **Name:** `www`
   - **Value/Points to:** `6f0830412f6ebcf4.vercel-dns-017.com.`
   - **TTL:** `600` (or leave default)
4. Click **Save**

**Important:** Make sure to include the period (`.`) at the end of `6f0830412f6ebcf4.vercel-dns-017.com.` - some DNS providers require it!

---

### Step 6: Verify Your DNS Records

Your DNS records should now look like this:

| Type | Name | Value |
|------|------|-------|
| A | @ | 216.198.79.1 |
| CNAME | www | 6f0830412f6ebcf4.vercel-dns-017.com. |

**Double-check:**
- ✅ The two old A records are deleted
- ✅ The new A record points to `216.198.79.1`
- ✅ The CNAME record points to `6f0830412f6ebcf4.vercel-dns-017.com.`

---

### Step 7: Save Changes

1. If there's a **Save** or **Save Changes** button at the bottom, click it
2. GoDaddy may ask for confirmation - click **Yes** or **Confirm**
3. You should see a success message

---

### Step 8: Wait for DNS Propagation

**Important timing information:**
- **Minimum wait time:** 10-30 minutes
- **Typical wait time:** 1-2 hours
- **Maximum wait time:** 24-48 hours (rare)

During this time:
- DNS changes are propagating globally
- Your site may be accessible in some locations but not others
- This is completely normal!

---

### Step 9: Check Vercel Domain Status

1. Go back to [Vercel Dashboard](https://vercel.com/dashboard)
2. Open your **rendered-fits** project
3. Go to **Settings** → **Domains**
4. Look at the status of your domains:
   - `renderedfits.com` should show "Valid Configuration" (green checkmark)
   - `www.renderedfits.com` should show "Valid Configuration" (green checkmark)

**If still showing "Invalid Configuration":**
- Wait 15-30 more minutes
- Click the **Refresh** button in Vercel
- DNS changes can take time

---

### Step 10: Test Your Domain

Once Vercel shows "Valid Configuration":

1. Open a new browser tab
2. Go to: **https://renderedfits.com**
3. Your website should load!
4. Also test: **https://www.renderedfits.com**

**Both URLs should work and show your virtual try-on site!**

---

## 🔍 Verification Checklist

Use this to confirm everything is set up correctly:

- [ ] Logged into GoDaddy
- [ ] Accessed DNS Management for renderedfits.com
- [ ] Deleted old A record: @ → 13.248.243.5
- [ ] Deleted old A record: @ → 76.223.105.230
- [ ] Added new A record: @ → 216.198.79.1
- [ ] Added CNAME record: www → 6f0830412f6ebcf4.vercel-dns-017.com.
- [ ] Saved all changes in GoDaddy
- [ ] Waited at least 30 minutes
- [ ] Checked Vercel domain status (shows "Valid Configuration")
- [ ] Tested https://renderedfits.com (works!)
- [ ] Tested https://www.renderedfits.com (works!)
- [ ] HTTPS/SSL is active (padlock icon in browser)

---

## 📸 Visual Guide - What to Look For

### In GoDaddy DNS Management:

**Before (what you need to remove):**
```
Type    Name    Value               TTL
A       @       13.248.243.5        600
A       @       76.223.105.230      600
```

**After (correct setup):**
```
Type    Name    Value                                   TTL
A       @       216.198.79.1                           600
CNAME   www     6f0830412f6ebcf4.vercel-dns-017.com.  600
```

---

## 🚨 Troubleshooting

### Problem: "Can't find the conflicting A records"

**Solution:**
- They might already be deleted
- Look for ANY A record with Name = `@` or blank
- If you don't see them, skip to Step 4 and add the new records

---

### Problem: "GoDaddy won't let me add the CNAME record"

**Possible causes:**
1. **Name field error:** Make sure you enter just `www` (not `www.renderedfits.com`)
2. **Conflicting record:** Delete any existing CNAME or A record with Name = `www`
3. **Period at the end:** Some GoDaddy interfaces auto-add the period - don't duplicate it

**Try this:**
- Remove the period from the end: `6f0830412f6ebcf4.vercel-dns-017.com`
- GoDaddy may add it automatically

---

### Problem: "Domain still shows Invalid Configuration in Vercel after hours"

**Diagnosis steps:**

1. **Check DNS propagation:**
   - Go to https://dnschecker.org
   - Enter `renderedfits.com`
   - Select "A" record type
   - Check if it shows `216.198.79.1` globally

2. **Verify records in GoDaddy:**
   - Log back into GoDaddy DNS Management
   - Confirm the records match exactly what Vercel asked for
   - Look for any typos

3. **Check for extra records:**
   - Sometimes there are "Parked" or "Forwarding" settings
   - In GoDaddy, check the "Forwarding" tab
   - Remove any domain forwarding

---

### Problem: "Site loads but shows 'Not Found' or 'No Configuration Found'"

**Solution:**
1. Go to Vercel → Settings → Domains
2. Make sure both domains are listed:
   - `renderedfits.com`
   - `www.renderedfits.com`
3. If missing, add them using the "Add" button
4. Wait for DNS verification

---

### Problem: "HTTP works but HTTPS doesn't"

**Solution:**
- Vercel automatically provisions SSL certificates
- This happens AFTER DNS is verified
- Wait an additional 5-15 minutes after DNS verification
- SSL certificates are issued automatically by Let's Encrypt
- Do NOT try to add SSL manually

---

## 🔄 What About renderedfits.co.uk?

You mentioned you also bought **renderedfits.co.uk**. To set that up:

### Option 1: Point to Same Vercel Site
Repeat the same process for the .co.uk domain:
1. In Vercel: Settings → Domains → Add `renderedfits.co.uk`
2. Vercel will provide DNS records for .co.uk
3. Go to GoDaddy DNS Management for **renderedfits.co.uk**
4. Add the DNS records Vercel provides
5. Both .com and .co.uk will show the same site

### Option 2: Redirect .co.uk to .com
In GoDaddy (for renderedfits.co.uk):
1. Go to DNS Management
2. Click the "Forwarding" tab
3. Set up domain forwarding:
   - Forward to: `https://renderedfits.com`
   - Forward type: Permanent (301)
   - Settings: Forward only

**Recommendation:** Use Option 1 to maximize your web presence. Both domains will work independently.

---

## ⏰ Timeline Summary

| Time | What's Happening |
|------|------------------|
| 0 min | You save DNS changes in GoDaddy |
| 10 min | DNS starts propagating to some servers |
| 30 min | Check Vercel domain status |
| 1-2 hours | DNS fully propagated (typical) |
| 2+ hours | Vercel shows "Valid Configuration" |
| 2+ hours + 5 min | SSL certificate provisioned |
| DONE | https://renderedfits.com works! |

---

## ✅ Success Criteria

You're done when:

1. ✅ Vercel shows "Valid Configuration" with green checkmark
2. ✅ https://renderedfits.com loads your site
3. ✅ https://www.renderedfits.com loads your site
4. ✅ Both URLs show the padlock icon (HTTPS/SSL)
5. ✅ All 5 fashion brand outfits are visible
6. ✅ No browser security warnings

---

## 📞 Need Help?

**GoDaddy Support:**
- Phone: 1-480-505-8877 (US)
- Chat: Available in GoDaddy account
- Help: https://www.godaddy.com/help

**Vercel Support:**
- Dashboard: https://vercel.com/support
- Docs: https://vercel.com/docs/concepts/projects/domains

---

**You've got this! Follow each step carefully and your domain will be live! 🚀**
