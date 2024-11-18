import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('appwrite_session');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (!authCookie && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (authCookie && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}