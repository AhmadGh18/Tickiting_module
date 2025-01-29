import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar', 'fr'], // Supported locales
  defaultLocale: 'en',        // Default locale
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect to default locale if locale is missing
  if (!/^\/(en|ar|fr)/.test(pathname)) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|ar|fr)/:path*'], // Match routes with or without locales
};
