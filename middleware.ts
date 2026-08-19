import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isProd = process.env.VERCEL === '1' 
    ? process.env.VERCEL_ENV === 'production' 
    : process.env.NODE_ENV === 'production';

  if (isProd) {
    const proto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');
    if (proto === 'http') {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.protocol = 'https:';
      return NextResponse.redirect(redirectUrl, 301);
    }

    let canonicalHost = process.env.CANONICAL_HOST || null;
    if (!canonicalHost && process.env.NEXT_PUBLIC_SITE_URL) {
      try {
        canonicalHost = new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname;
      } catch (e) {
        console.error('Invalid NEXT_PUBLIC_SITE_URL format in environment variables');
      }
    }

    if (canonicalHost && request.nextUrl.hostname !== canonicalHost) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.hostname = canonicalHost;
      return NextResponse.redirect(redirectUrl, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
