# Dimah-Fitness: Premium Gym & Fitness Platform

A modern, luxury fitness platform built with Next.js, featuring multiple user roles, premium memberships, and comprehensive gym management.

## Features

### Public Pages
- **Home/Landing Page** - Hero section with gym images, features overview, membership tiers, and CTA
- **Services Page** - Detailed service offerings with 6 premium service types and amenities
- **Gallery Page** - Image gallery with filtering and lightbox modal (6 professional gym images)
- **Contact Page** - Contact form with location, phone, email, and hours information
- **Reviews Page** - Member testimonials with 5-star rating system and review submission

### Authentication
- Signup page with email and password registration
- Login page with role-based routing (member, trainer, admin)
- Password hashing with bcrypt for security
- JWT token generation for authenticated sessions

### Dashboards (Protected Routes)
- **Member Dashboard** - Upcoming classes, membership status, booking history, fitness stats
- **Trainer Dashboard** - Class management, member requests, session tracking, revenue analytics
- **Admin Dashboard** - Complete gym management with KPIs, member/trainer management, analytics

### Membership & Payments
- Three membership tiers (Basic, Premium, Elite) with different features
- Stripe integration for secure payment processing
- Automatic membership activation on successful payment
- Webhook handling for payment events

### Theme System
- Beautiful light theme (default) with clean, professional aesthetic
- Premium dark theme with luxury gold accents
- Theme toggle button in navigation (Sun/Moon icon)
- Persistent theme storage in localStorage
- Automatic theme detection on page load

### Navigation
- Responsive navbar with active link highlighting (colorful gradient underline)
- Mobile hamburger menu for responsive design
- Theme toggle button accessible on both desktop and mobile
- Page routing: Home, Services, Gallery, Contact, Reviews, Login, Signup

## Technology Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui components
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + bcrypt
- **Payments:** Stripe API
- **Animations:** GSAP (ready for implementation)
- **UI Components:** 50+ pre-built shadcn components

## Project Structure

```
/app
  /api
    /auth
      /login/route.ts
      /signup/route.ts
    /payments
      /create-intent/route.ts
      /webhook/route.ts
  /dashboard/page.tsx
  /trainer/page.tsx
  /admin/page.tsx
  /login/page.tsx
  /signup/page.tsx
  /services/page.tsx
  /gallery/page.tsx
  /contact/page.tsx
  /reviews/page.tsx
  /membership/page.tsx
  /membership/checkout/page.tsx
  page.tsx (landing page)
  layout.tsx
  globals.css

/lib
  /models
    User.ts
    Class.ts
    Booking.ts
    Membership.ts
  db.ts
  auth.ts

/components
  navbar.tsx (reusable navigation)
  theme-toggle.tsx
  /ui (50+ shadcn components)

/public
  hero-gym.jpg (dark theme hero)
  hero-gym-light.jpg (light theme hero)
  gallery-1.jpg through gallery-6.jpg
```

## Getting Started

### Installation

```bash
# Using shadcn CLI (recommended)
npx shadcn-cli@latest init my-dimah-app
cd my-dimah-app

# Or extract and install directly
unzip dimah-fitness.zip
cd dimah-fitness
pnpm install
```

### Environment Setup

Create `.env.local` with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

Get these keys:
- **MongoDB URI:** From MongoDB Atlas (mongodb+srv://...)
- **JWT_SECRET:** Generate any secure random string
- **Stripe Keys:** From Stripe Dashboard > Developers > API Keys

### Running Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Pages

### Public Routes
- `/` - Landing page with hero, features, membership preview
- `/services` - Detailed service descriptions and amenities
- `/gallery` - Image gallery with category filtering
- `/contact` - Contact form and location information
- `/reviews` - Member reviews and testimonials
- `/signup` - User registration
- `/login` - User authentication

### Protected Routes (Authenticated Users)
- `/dashboard` - Member dashboard
- `/trainer` - Trainer dashboard
- `/admin` - Admin dashboard
- `/membership` - Membership selection
- `/membership/checkout` - Stripe payment checkout

## Key Features Implemented

### Authentication System
- Email/password signup with validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Role-based dashboard routing

### Database Models
- **User:** Stores user info, email, hashed password, role, membership details
- **Class:** Gym classes with trainer info, schedule, capacity, description
- **Booking:** Class bookings with member, class, booking time references
- **Membership:** Subscription details, tier, price, features, renewal dates

### Payment Processing
- Stripe Payment Intent creation
- Webhook handling for payment confirmations
- Automatic membership status updates
- Secure PCI-compliant checkout page

### UI/UX Enhancements
- Light and dark theme with seamless switching
- Active navigation link highlighting with colorful gradient
- Responsive mobile-first design
- Modal/dialog for gallery image preview
- Form validation with toast notifications
- Smooth transitions and hover effects

## Customization

### Adding New Services
Edit `/app/services/page.tsx` and add to the `services` array:

```typescript
{
  icon: YourIcon,
  title: 'Service Name',
  description: 'Description',
  features: ['feature1', 'feature2'],
}
```

### Adding Gallery Images
Generate or upload images to `/public/` and update `/app/gallery/page.tsx`:

```typescript
{
  src: '/your-image.jpg',
  title: 'Image Title',
  category: 'Category',
}
```

### Customizing Theme Colors
Edit `/app/globals.css` and modify the CSS variables in `:root` and `.dark` sections.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Authenticate user

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/payments/webhook` - Handle Stripe webhooks

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTPS-ready deployment
- Protected routes and dashboards
- Secure payment processing with Stripe
- Input validation and sanitization
- Environment variable protection

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel
1. Go to Project Settings
2. Go to Environment Variables
3. Add all keys from `.env.local`

### Deploy to Other Platforms
- Netlify: Use `next.config.mjs` for Vercel AI Gateway
- AWS: Use `npm run build` then deploy to Lambda/Amplify
- Docker: Create Dockerfile based on Node.js official image

## Future Enhancements

- GSAP animations throughout the app
- Advanced class booking system with calendar
- Member progress tracking with charts
- Trainer scheduling and availability
- Payment history and invoicing
- Email notifications
- SMS alerts
- Mobile app (React Native)
- Video classes/streaming
- Nutrition tracking integration

## Support

For questions or issues, contact: info@dimah-fitness.com

## License

All rights reserved. Dimah-Fitness © 2024
