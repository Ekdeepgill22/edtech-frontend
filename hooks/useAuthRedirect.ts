'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuthRedirect(redirectTo: string = '/login') {
  const router = useRouter();

  useEffect(() => {
    // Check authentication and redirect if needed
    const isAuthenticated = false; // Replace with actual auth check
    
    if (!isAuthenticated) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);
}

export function useRequireAuth() {
  useAuthRedirect('/login');
}