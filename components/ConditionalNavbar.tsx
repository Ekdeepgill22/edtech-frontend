'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Don't show navbar on auth pages
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  
  if (isAuthPage) {
    return null;
  }
  
  return <Navbar />;
}
