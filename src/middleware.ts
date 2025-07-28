import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block admin routes and upload API in production
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/upload-image')) {
    // Only allow in development environment
    if (process.env.NODE_ENV === 'production') {
      console.log(`Blocked access to ${pathname} in production`)
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/upload-image/:path*'
  ]
} 