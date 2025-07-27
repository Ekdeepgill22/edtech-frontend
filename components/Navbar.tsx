'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useClerk } from '@clerk/nextjs';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const navigationLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/practice', label: 'Practice' },
    { href: '/grammar-check', label: 'Grammar Check' },
    { href: '/docx-export', label: 'DOCX Export' },
    { href: '/resources', label: 'Resources' },
  ];

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  const handleSignOut = () => {
    signOut();
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    if (user?.emailAddresses?.[0]?.emailAddress) {
      return user.emailAddresses[0].emailAddress[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#0b0c2a] to-[#2b00b5] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link 
            href="/dashboard" 
            className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-white font-inter tracking-tight">
              ScribbleSense
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(link.href)
                    ? 'text-orange-400 underline underline-offset-4 decoration-2'
                    : 'text-gray-100 hover:text-orange-400 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:bg-white/10 transition-colors duration-200"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.imageUrl} alt="Profile" />
                      <AvatarFallback className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2" align="end">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.emailAddresses?.[0]?.emailAddress}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-all duration-200"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 rounded-lg mt-2 mb-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActiveRoute(link.href)
                    ? 'text-orange-400 bg-white/10 border-l-4 border-orange-400'
                    : 'text-gray-100 hover:text-orange-400 hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Authentication */}
            <div className="pt-4 border-t border-white/20">
              {mockUser.isSignedIn ? (
                <div className="space-y-2">
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={mockUser.imageUrl} alt="Profile" />
                        <AvatarFallback className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {mockUser.firstName} {mockUser.lastName}
                        </p>
                        <p className="text-xs text-gray-300">
                          {mockUser.emailAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center px-3 py-2 text-gray-100 hover:text-orange-400 hover:bg-white/10 rounded-md transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="mr-3 h-4 w-4" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-md transition-colors duration-200"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
