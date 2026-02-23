# Dimah-Fitness Setup Instructions

## Issues Fixed

### 1. ✅ Package.json Dependency Issue
- **Problem:** `jsonwebtoken@^9.1.2` doesn't exist (latest is 9.0.3)
- **Fixed:** Changed to `jsonwebtoken@^9.0.2`
- **Fixed:** Removed extra blank line causing JSON syntax error

### 2. ✅ Missing Public Directory
- **Problem:** No `public/` folder for static assets
- **Fixed:** Created `public/` and `public/images/` directories

### 3. ✅ Missing Environment Variables
- **Problem:** No `.env.local` file
- **Fixed:** Created `.env.local` template with all required variables

## Next Steps to Complete Setup

### Step 1: Install Dependencies
```bash
npm install
# or
pnpm install
```

### Step 2: Configure Environment Variables
Edit `.env.local` and add your actual credentials:

1. **MongoDB URI** (Required)
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string (format: mongodb+srv://username:password@cluster.mongodb.net/dimah-fitness)

2. **JWT Secret** (Required)
   - Generate a secure random string (32+ characters)
   - Example: `openssl rand -base64 32` or use any password generator

3. **Stripe Keys** (Required for payments)
   - Sign up at https://stripe.com
   - Go to Developers > API Keys
   - Copy Publishable Key and Secret Key
   - For webhook secret: Set up webhook endpoint in Stripe Dashboard

### Step 3: Add Images (8 images needed)
Place these images in the `public/` directory:

**Hero Images (2 images):**
1. `hero-gym.jpg` - Dark theme hero image (gym interior, dramatic lighting)
2. `hero-gym-light.jpg` - Light theme hero image (bright, clean gym space)

**Gallery Images (6 images):**
3. `gallery-1.jpg` - State-of-the-Art Equipment
4. `gallery-2.jpg` - Yoga & Pilates Classes
5. `gallery-3.jpg` - HIIT Training Sessions
6. `gallery-4.jpg` - Personal Training
7. `gallery-5.jpg` - Premium Lounge Area
8. `gallery-6.jpg` - Strength Training Zone

**Recommended Image Specs:**
- Hero images: 1920x1080px or larger (landscape)
- Gallery images: 1200x800px (landscape)
- Format: JPG or WebP
- Quality: High resolution for professional look

**Where to get images:**
- Unsplash.com (free, high-quality)
- Pexels.com (free stock photos)
- Your own gym photos

### Step 4: Run Development Server
```bash
npm run dev
# or
pnpm dev
```

Visit http://localhost:3000

### Step 5: Test the Application

**Test Authentication:**
1. Go to `/signup` and create an account
2. Login at `/login`
3. Check dashboard access

**Test Pages:**
- Home: http://localhost:3000
- Services: http://localhost:3000/services
- Gallery: http://localhost:3000/gallery
- Contact: http://localhost:3000/contact
- Reviews: http://localhost:3000/reviews

## Project Status

### ✅ Completed
- Next.js 16 setup with TypeScript
- 50+ shadcn/ui components installed
- Authentication system (signup/login)
- Database models (User, Class, Booking, Membership)
- Payment integration (Stripe)
- Theme system (light/dark mode)
- Responsive navigation
- All page routes created

### ⚠️ Requires Configuration
- MongoDB connection
- Stripe API keys
- JWT secret
- Images (8 total)

### 🔧 Optional Enhancements
- Add GSAP animations
- Implement booking system
- Add email notifications
- Create admin panel features
- Add more gallery images

## Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:** Make sure your MongoDB URI is correct and your IP is whitelisted in MongoDB Atlas

### Issue: Stripe Webhook Fails
**Solution:** Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/payments/webhook`

### Issue: Images Not Loading
**Solution:** Ensure images are in `public/` directory (not `public/images/`) and use correct filenames

### Issue: Theme Not Persisting
**Solution:** Check browser localStorage is enabled

## File Structure Overview

```
dimah-fitness/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Member dashboard
│   ├── admin/            # Admin dashboard
│   ├── trainer/          # Trainer dashboard
│   └── [pages]/          # Public pages
├── components/            # React components
│   ├── ui/               # shadcn components (50+)
│   ├── navbar.tsx        # Navigation
│   └── theme-toggle.tsx  # Theme switcher
├── lib/                   # Utilities
│   ├── models/           # Database models
│   ├── auth.ts           # Authentication
│   └── db.ts             # Database connection
├── public/                # Static assets
│   ├── hero-gym.jpg      # (ADD THIS)
│   ├── hero-gym-light.jpg # (ADD THIS)
│   └── gallery-*.jpg     # (ADD 6 IMAGES)
├── .env.local            # Environment variables (CONFIGURE THIS)
└── package.json          # Dependencies (FIXED)
```

## Support

If you encounter issues:
1. Check this file for solutions
2. Review the main README.md
3. Check console for error messages
4. Verify all environment variables are set

## Ready to Deploy?

Once everything works locally:
1. Push to GitHub
2. Deploy to Vercel (recommended)
3. Add environment variables in Vercel dashboard
4. Configure Stripe webhook for production URL
