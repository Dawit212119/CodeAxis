import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/submit-project',
  '/api/projects',
  '/api/courses',
  '/api/users/profile',
  '/api/upload',
  '/api/dashboard'
]

// Define admin-only routes
const adminRoutes = [
  '/admin',
  '/api/admin'
]

// Define public API routes that don't require auth
const publicApiRoutes = [
  '/api/auth',
  '/api/freelancers',
  '/api/student-registration'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow all requests to public routes
  if (pathname.startsWith('/api/auth') || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/favicon') ||
      pathname === '/' ||
      pathname.startsWith('/learn') && !pathname.includes('/dashboard')) {
    return NextResponse.next()
  }

  // Check if route requires authentication
  const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route))
  const requiresAdmin = adminRoutes.some(route => pathname.startsWith(route))
  const isPublicApi = publicApiRoutes.some(route => pathname.startsWith(route))

  if (isPublicApi && !requiresAuth) {
    return NextResponse.next()
  }

  if (requiresAuth || requiresAdmin) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      // Redirect to login for page routes, return 401 for API routes
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      // Clear invalid token and redirect/return error
      const response = pathname.startsWith('/api/') 
        ? NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        : NextResponse.redirect(new URL('/auth/signin', request.url))
      
      response.cookies.delete('auth-token')
      return response
    }

    // Check admin access
    if (requiresAdmin && decoded.role !== 'admin') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Add user info to request headers for API routes
    if (pathname.startsWith('/api/')) {
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', decoded.userId)
      requestHeaders.set('x-user-role', decoded.role)
      requestHeaders.set('x-user-email', decoded.email)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}