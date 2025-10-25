import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Force HTTPS redirect - redirect HTTP to HTTPS
  if (request.nextUrl.protocol === 'http:') {
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

  // Add canonical URL header to help with duplicate content issues
  const canonicalUrl = `https://citizentestcanada.com${request.nextUrl.pathname}`
  response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`)

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

  return response
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
