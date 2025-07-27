'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

      {/* Registration Form */}
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-white">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400/50 focus:ring-orange-400/20"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-white">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400/50 focus:ring-orange-400/20"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400/50 focus:ring-orange-400/20"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400/50 focus:ring-orange-400/20"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold"
        >
          Create Account
        </Button>
      </form>

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
