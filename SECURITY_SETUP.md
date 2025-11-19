# Security Setup Guide

## Overview

This application now has secure API key handling and protected admin features. Follow this guide to set up your environment securely.

## Environment Variables Setup

### 1. Create a `.env` file

Create a `.env` file in the root directory (this file is gitignored and will NOT be committed):

```bash
# Copy the example file
cp .env.example .env
```

### 2. Configure Your Secrets

Edit the `.env` file and add your actual values:

```env
# Gemini API Key - Get from https://aistudio.google.com/app/apikey
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here

# Admin Password - Use a strong, unique password
VITE_ADMIN_PASSWORD=your_secure_admin_password_here
```

**IMPORTANT SECURITY NOTES:**
- ⚠️ NEVER commit the `.env` file to version control
- ⚠️ NEVER share your API keys or admin password
- ⚠️ The `.env` file is already in `.gitignore` to prevent accidental commits
- ✅ Use a strong, unique password for admin access
- ✅ Rotate your API keys and passwords regularly

## Admin Panel Features

### Accessing the Admin Panel

1. Navigate to `/admin` route
2. Enter the admin password (from `VITE_ADMIN_PASSWORD`)
3. Access admin features:
   - **Custom Try-On Tool**: Upload custom selfie and outfit images
   - **Daily Limit**: Limited to 5 try-ons per day (resets at midnight)
   - **Product Management**: Add/edit/delete outfits
   - **Analytics**: View usage statistics

### Custom Try-On Tool

The admin panel includes a custom try-on tool with:
- File upload for selfie images
- File upload for outfit images
- Daily limit of 5 uses (tracked in localStorage)
- Progress indicators during processing
- Download functionality for results

## Regular User Features

- **Unlimited Try-Ons**: Regular users have no daily limits (999,999/day)
- **Product-Based Try-On**: Try on pre-loaded outfits from the catalog
- **Model Photo Reuse**: Generated model photos are saved for the day

## API Key Security

### Best Practices

1. **Never expose API keys in client-side code**: While Vite environment variables starting with `VITE_` are exposed to the client, they are only visible to users who inspect the code. For production, consider:
   - Using a backend proxy to handle API calls
   - Implementing rate limiting on the server
   - Using Google Cloud API key restrictions

2. **API Key Restrictions** (Recommended for Production):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to APIs & Services > Credentials
   - Select your API key
   - Add restrictions:
     - **Application restrictions**: HTTP referrers (websites)
     - Add your website URL (e.g., `https://yourdomain.com/*`)
     - **API restrictions**: Limit to Generative Language API only

3. **Monitor Usage**:
   - Check your [Google AI Studio](https://aistudio.google.com/) usage regularly
   - Set up usage alerts if available
   - Monitor for unusual spikes in API calls

## Production Deployment

### Before deploying to production:

1. **Set Environment Variables** on your hosting platform:
   ```
   VITE_GEMINI_API_KEY=your_production_api_key
   VITE_ADMIN_PASSWORD=your_production_admin_password
   ```

2. **Verify .gitignore** includes:
   ```
   .env
   .env.local
   .env.production
   ```

3. **Test the build**:
   ```bash
   npm run build
   npm run preview
   ```

4. **Deploy** only the `dist` folder (never deploy source with `.env` file)

## Troubleshooting

### API Key Issues

If you see "API key is not configured" warning:
1. Check that `.env` file exists
2. Verify `VITE_GEMINI_API_KEY` is set correctly
3. Restart the dev server after changing `.env`
4. Check browser console for specific errors

### Admin Password Issues

If admin login fails:
1. Verify `VITE_ADMIN_PASSWORD` is set in `.env`
2. Clear browser session storage: `sessionStorage.clear()`
3. Restart dev server

## Daily Limits

### Admin Panel Custom Try-On
- **Limit**: 5 uses per day
- **Storage**: localStorage (`customTryOnUsage` key)
- **Reset**: Automatic at midnight (local time)
- **Clear manually**:
  ```javascript
  localStorage.removeItem('customTryOnUsage')
  ```

### Regular User Try-On
- **Limit**: Effectively unlimited (999,999/day)
- **Storage**: localStorage (`virtualTryOnUsage` key)
- **Model Photo**: Saved for 24 hours to avoid regeneration

## Support

For issues or questions:
1. Check this guide first
2. Verify environment variables are set correctly
3. Check browser console for errors
4. Review the API key restrictions in Google Cloud Console
