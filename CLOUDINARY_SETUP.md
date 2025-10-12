# Cloudinary Setup Guide

This guide will help you set up Cloudinary for image uploads in your admin panel.

## Step 1: Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your Cloud Name

1. After logging in, you'll see your **Dashboard**
2. Find your **Cloud Name** at the top of the dashboard
3. Copy this value (e.g., `dy1234abcd`)dreqyufq1

## Step 3: Create an Upload Preset

1. In your Cloudinary dashboard, navigate to **Settings** (gear icon)
2. Go to the **Upload** tab
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Configure the preset:
   - **Signing Mode**: Select **Unsigned** (important for client-side uploads)
   - **Upload preset name**: Give it a name (e.g., `wardrobe_uploads`)
   - **Folder**: (optional) Set a folder name like `wardrobe/outfits`
   - **Format**: Leave as auto
   - **Access mode**: Public
6. Click **Save**
7. Copy the **preset name** you just created

## Step 4: Configure Your Environment

1. Open your `.env.local` file (or create one if it doesn't exist)
2. Add these lines:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_here
```

3. Replace `your_cloud_name_here` with your Cloud Name from Step 2
4. Replace `your_upload_preset_here` with your preset name from Step 3

Example:
```env
VITE_CLOUDINARY_CLOUD_NAME=dy1234abcd
VITE_CLOUDINARY_UPLOAD_PRESET=wardrobe_uploads
```

## Step 5: Restart Your Dev Server

1. Stop your development server (Ctrl+C)
2. Run `npm run dev` again
3. Navigate to `/admin` and try uploading an image!

## Free Tier Limits

Cloudinary's free tier includes:
- 25 GB storage
- 25 GB bandwidth/month
- 25,000 transformations/month

This is more than enough for most personal/small business sites.

## Optional: Optimize Upload Settings

In your Cloudinary upload preset, you can add transformations to automatically:
- Resize images to max width/height
- Compress images for web
- Convert to WebP format

Example transformation:
```
w_1200,h_1600,c_limit,q_auto,f_auto
```

This will:
- Limit width to 1200px and height to 1600px
- Auto quality optimization
- Auto format selection (WebP when supported)

## Troubleshooting

### "Upload failed" error
- Check that your Cloud Name and Upload Preset are correct
- Make sure the upload preset is set to **Unsigned**
- Check browser console for detailed error messages

### Images not uploading
- Verify your .env.local file has the correct values
- Make sure you restarted the dev server after adding environment variables
- Check that file size is under 10MB

### Need help?
- Cloudinary Documentation: https://cloudinary.com/documentation
- Contact support: https://support.cloudinary.com/
