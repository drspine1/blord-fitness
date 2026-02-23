import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get('auth-token')?.value;
  
  // Public routes that authenticated users should NOT access
  const publicRoutes = ['/', '/login', '/signup', '/services', '/contact', '/about', '/blog', '/reviews', '/gallery'];
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  });
  
  // If authenticated user tries to access public route, redirect to dashboard
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Allow all other routes (dashboard, classes, etc.) to pass through
  // The pages will handle their own auth checks
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/services/:path*',
    '/contact/:path*',
    '/about/:path*',
    '/blog/:path*',
    '/reviews/:path*',
    '/gallery/:path*',
  ],
};
