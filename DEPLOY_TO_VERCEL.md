# Deploy Your Donation Platform to Vercel

## Why Vercel is Perfect for Your Project
- **Zero monthly fees** for personal/small projects
- **Automatic SSL** certificates
- **Custom domains** included
- **Serverless functions** for your API
- **Automatic deployments** from GitHub
- **Built for React** applications

## Step-by-Step Deployment Guide

### 1. Download Your Project
1. In Replit, click the three dots (⋮) menu
2. Select "Download as zip"
3. Extract the files to your computer

### 2. Set Up GitHub Repository
1. Go to [github.com](https://github.com) and create a new repository
2. Make it **private** (so the charity owner won't see the Replit history)
3. Upload all your project files to this repository

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy"

### 4. Environment Variables (Important!)
In Vercel dashboard, go to Settings > Environment Variables and add:
```
DATABASE_URL=your_postgresql_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 5. Custom Domain
1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain (e.g., yourcharity.com)
3. Follow Vercel's instructions to update your DNS

### 6. Database Setup
You'll need a PostgreSQL database. Best options:
- **Neon** (free tier available): neon.tech
- **Supabase** (free tier): supabase.com
- **Railway** (affordable): railway.app

## Benefits Over Replit
- ✅ **No monthly fees** for standard usage
- ✅ **Professional domain** (yourcharity.com instead of replit.app)
- ✅ **Better performance** and reliability
- ✅ **No Replit branding** anywhere
- ✅ **Automatic HTTPS** and security
- ✅ **Easy updates** via GitHub

## Cost Breakdown
- **Vercel**: FREE for your usage level
- **Domain**: £10-15/year
- **Database**: FREE tier available on Neon/Supabase
- **Total**: ~£15/year vs £96/year on Replit

## Next Steps
1. Download your project from Replit
2. Create GitHub repository
3. Deploy to Vercel
4. Set up database and environment variables
5. Point your domain to Vercel

The platform will work exactly the same, but with professional hosting and no monthly fees!