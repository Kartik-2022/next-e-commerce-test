// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  const { pathname } = request.nextUrl;

  
  const publicPaths = ['/login', '/', '/products', '/products/[id]'];
  const isPublicPath = publicPaths.includes(pathname) || pathname.startsWith('/products/');


 
  const protectedPaths = ['/shop', '/cart', '/checkout']; 
  const isProtectedPath = protectedPaths.includes(pathname);


  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/shop', request.url));
  }
  

  if (pathname === '/' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
