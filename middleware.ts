import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simplified middleware without Clerk for now
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
