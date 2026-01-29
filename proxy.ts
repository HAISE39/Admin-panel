import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const authCookie = request.cookies.get('auth');
  const { pathname } = request.nextUrl;

  // Protect admin and api/scripts routes
  if (pathname.startsWith('/admin') || (pathname.startsWith('/api/scripts') && request.method !== 'GET')) {
    if (!authCookie || authCookie.value !== 'true') {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/scripts/:path*'],
};
