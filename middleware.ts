import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only enforce redirects in production
  const isProd = process.env.VERCEL === '1' ? process.env.VERCEL_ENV === 'production' : process.env.NODE_ENV === 'production'
  if (isProd) {
    const proto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '')
    if (proto === 'http') {
      const redirectUrl = new URL(request.url)
      redirectUrl.protocol = 'https:'
      return NextResponse.redirect(redirectUrl, 301)
    }

    // Canonical host redirect (avoid loops by making this env-driven)
    const canonicalHost = process.env.CANONICAL_HOST
      || (process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname : null)

    if (canonicalHost && request.nextUrl.hostname !== canonicalHost) {
      const redirectUrl = new URL(request.url)
      redirectUrl.hostname = canonicalHost
      return NextResponse.redirect(redirectUrl, 301)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
