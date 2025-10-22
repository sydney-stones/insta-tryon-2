# DNS Setup Quick Reference Card

Print this or keep it open while setting up DNS in GoDaddy.

---

## 🎯 Your Mission

Connect **renderedfits.com** (GoDaddy) → Vercel website

---

## 📋 Exact Records to Set in GoDaddy

### DELETE These Records First:

| Type | Name | Value | Action |
|------|------|-------|--------|
| A | @ | 13.248.243.5 | ❌ DELETE |
| A | @ | 76.223.105.230 | ❌ DELETE |

### ADD These Records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 216.198.79.1 | 600 |
| CNAME | www | 6f0830412f6ebcf4.vercel-dns-017.com. | 600 |

---

## 🚀 Quick Steps

1. **GoDaddy:** godaddy.com → Sign In → My Products
2. **Find domain:** renderedfits.com → Click **DNS**
3. **Delete:** Remove both old A records (see table above)
4. **Add A Record:** @ → 216.198.79.1
5. **Add CNAME:** www → 6f0830412f6ebcf4.vercel-dns-017.com.
6. **Save** all changes
7. **Wait** 30 minutes minimum
8. **Check Vercel:** Settings → Domains (should show green checkmark)
9. **Test:** https://renderedfits.com

---

## ⚠️ Important Notes

- **@** means "root domain" (renderedfits.com)
- **www** is a subdomain (www.renderedfits.com)
- **TTL 600** = 10 minutes (can use default)
- **Period at end** of CNAME value may be auto-added by GoDaddy
- **Wait time:** 30 min - 24 hours (usually 1-2 hours)

---

## ✅ Success Check

- [ ] GoDaddy shows both new records
- [ ] Vercel shows "Valid Configuration" ✓
- [ ] https://renderedfits.com loads
- [ ] https://www.renderedfits.com loads
- [ ] Padlock icon (HTTPS) visible

---

## 🆘 Quick Troubleshooting

**"Invalid Configuration" in Vercel?**
→ Wait longer (DNS takes time)

**"Can't add CNAME"?**
→ Delete existing www record first

**"Site doesn't load"?**
→ Check dnschecker.org - wait for propagation

**"No HTTPS?"**
→ Wait 5-15 min after DNS verification

---

**Need detailed help? See [GODADDY_DNS_SETUP.md](GODADDY_DNS_SETUP.md)**
