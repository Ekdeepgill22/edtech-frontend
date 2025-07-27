'use client';

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus } from 'lucide-react';

export default function Login() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 font-light">
          Sign in to continue your learning journey
        </p>
      </div>

      {/* Clerk SignIn Component */}
      <div className="flex justify-center">
        <SignIn 
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: {
                backgroundColor: '#f97316',
                '&:hover': {
                  backgroundColor: '#ea580c',
                },
              },
              card: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
              },
              headerTitle: {
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: '600',
              },
              headerSubtitle: {
                color: '#9ca3af',
              },
              socialButtonsBlockButton: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              },
              formFieldInput: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                '&:focus': {
                  borderColor: '#f97316',
                  boxShadow: '0 0 0 1px #f97316',
                },
                '&::placeholder': {
                  color: '#9ca3af',
                },
              },
              formFieldLabel: {
                color: '#ffffff',
              },
              footerActionLink: {
                color: '#f97316',
                '&:hover': {
                  color: '#ea580c',
                },
              },
              identityPreviewText: {
                color: '#ffffff',
              },
              identityPreviewEditButton: {
                color: '#f97316',
              },
            },
            variables: {
              colorPrimary: '#f97316',
              colorText: '#ffffff',
              colorTextSecondary: '#9ca3af',
              colorBackground: 'transparent',
              colorInputBackground: 'rgba(255, 255, 255, 0.1)',
              colorInputText: '#ffffff',
            },
          }}
        />
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-transparent text-gray-400">or</span>
        </div>
      </div>

      {/* Register Link */}
      <div className="text-center">
        <p className="text-gray-400 mb-4">
          Don't have an account yet?
        </p>
        <Link href="/register">
          <Button 
            variant="outline" 
            className="w-full border-white/20 text-white hover:bg-white/10 hover:border-orange-400/50 transition-all duration-300 group"
          >
            <UserPlus className="w-4 h-4 mr-2 group-hover:text-orange-400 transition-colors" />
            Create New Account
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
