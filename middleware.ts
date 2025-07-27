import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: ['/', '/login', '/register'],

  // Routes that should redirect to sign-in if not authenticated
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/login' },
      });
    }

    // Redirect logged in users to dashboard if they visit auth pages
    if (auth.userId && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/dashboard' },
      });
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
