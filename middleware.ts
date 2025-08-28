import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add noindex headers for auth pages
  if (request.nextUrl.pathname.startsWith('/auth/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, nocache')
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  }

  return response
}

export const config = {
  matcher: '/auth/:path*',
}
