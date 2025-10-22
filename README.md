<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Rendered Fits - Virtual Try-On Platform

A cutting-edge virtual try-on platform showcasing high-end fashion brands including Emilia Wickstead, ERDEM, Manolo Blahnik, Really Wild, and Uniqlo.

**Live Site:** [https://renderedfits.com](https://renderedfits.com)

## 🚀 Quick Deployment

**Having issues with a blank Vercel deployment?** See [QUICK_START.md](QUICK_START.md)

**Full deployment instructions:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 💻 Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. Clone the repository:
   ```bash
   git clone https://github.com/sydney-stones/insta-tryon-2.git
   cd insta-tryon-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your Gemini API key:
   ```bash
   echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env
   ```
   Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173)

## 🔐 Security

- **Never commit `.env` files** - they are protected in `.gitignore`
- **API keys are stored in Vercel environment variables** for production
- **All connections use HTTPS** via Vercel

## 📦 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **AI:** Google Gemini 2.5 Flash (Image Generation)
- **Hosting:** Vercel
- **Domain:** renderedfits.com

## 🎨 Features

- Virtual try-on with AI-powered image generation
- Interactive wardrobe with multiple fashion brands
- Pose variation generation
- Responsive design
- Product pages with pricing and shopping links

## 📝 License

Apache-2.0
