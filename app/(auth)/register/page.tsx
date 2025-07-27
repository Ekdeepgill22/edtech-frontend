'use client';

import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn, Star } from 'lucide-react';

export default function Register() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Join ScribbleSense
        </h2>
        <p className="text-gray-400 font-light">
          Start your multilingual learning adventure
        </p>
      </div>

      {/* Features Preview */}
      <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/30 rounded-lg p-4 mb-6">
        <h3 className="text-white font-semibold mb-2 flex items-center">
          <Star className="w-4 h-4 mr-2 text-orange-400" />
          What you'll get:
        </h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• AI-powered grammar correction</li>
          <li>• Multilingual OCR technology</li>
          <li>• Voice-to-text transcription</li>
          <li>• Personalized learning analytics</li>
        </ul>
      </div>

      {/* Clerk SignUp Component */}
      <div className="flex justify-center">
        <SignUp 
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
              verificationLinkStatusText: {
                color: '#ffffff',
              },
              verificationLinkStatusIconBox: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
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

      {/* Login Link */}
      <div className="text-center">
        <p className="text-gray-400 mb-4">
          Already have an account?
        </p>
        <Link href="/login">
          <Button 
            variant="outline" 
            className="w-full border-white/20 text-white hover:bg-white/10 hover:border-orange-400/50 transition-all duration-300 group"
          >
            <LogIn className="w-4 h-4 mr-2 group-hover:text-orange-400 transition-colors" />
            Sign In Instead
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
