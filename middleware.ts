import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only enforce redirects in production
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '')
    if (proto === 'http') {
      const redirectUrl = new URL(request.url)
      redirectUrl.protocol = 'https:'
      return NextResponse.redirect(redirectUrl, 301)
    }

    // Handle www redirect - redirect www to non-www for consistency
    if (request.nextUrl.hostname.startsWith('www.')) {
      const redirectUrl = new URL(request.url)
      redirectUrl.hostname = redirectUrl.hostname.replace('www.', '')
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
