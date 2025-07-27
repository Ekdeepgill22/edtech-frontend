'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  PenTool, 
  Mic, 
  Globe, 
  BarChart3, 
  Upload, 
  MessageSquare, 
  TrendingUp,
  Play,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Star,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: PenTool,
      title: "Upload Handwritten Notes",
      description: "Transform your handwriting into digital text with advanced OCR technology",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Mic,
      title: "Voice Practice with AI",
      description: "Practice pronunciation and speaking with intelligent voice feedback",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Multilingual Grammar Feedback",
      description: "Get instant grammar corrections in Hindi, English, and Punjabi",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Real-Time Progress Dashboard",
      description: "Track your learning journey with detailed analytics and insights",
      color: "from-orange-400 to-red-500"
    }
  ];

  const steps = [
    {
      icon: Upload,
      title: "Upload your handwriting or voice",
      description: "Simply upload your notes or record your voice"
    },
    {
      icon: MessageSquare,
      title: "Get instant AI feedback",
      description: "Our AI analyzes and provides detailed feedback"
    },
    {
      icon: TrendingUp,
      title: "Learn better every day",
      description: "Track progress and improve with personalized insights"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      language: "Hindi",
      quote: "ScribbleSense helped me improve my English writing skills tremendously. The AI feedback is incredibly accurate!",
      avatar: "PS",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      language: "Punjabi",
      quote: "The voice practice feature is amazing. I can now speak English with much more confidence.",
      avatar: "RK",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      language: "English",
      quote: "Learning Hindi grammar has never been easier. The multilingual support is fantastic!",
      avatar: "SJ",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5] text-white overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
              ScribbleSense
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-4 font-light">
              From pen to progress — AI-driven learning in your language.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Built for Hindi, English, and Punjabi learners
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 group"
              >
                Start Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link href="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how ScribbleSense transforms your learning experience with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-orange-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-300">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-orange-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Previews */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              See It In Action
            </h2>
            <p className="text-xl text-gray-300">
              Watch how ScribbleSense transforms learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-orange-400 transition-colors duration-300">
                    Grammar Correction in Action
                  </h3>
                  <p className="text-gray-300">
                    See how our AI provides instant grammar feedback across multiple languages
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Mic className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-orange-400 transition-colors duration-300">
                    Voice Feedback Demo
                  </h3>
                  <p className="text-gray-300">
                    Experience real-time pronunciation feedback and speaking practice
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              What Students Say
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of learners who trust ScribbleSense
            </p>
          </div>
          
          <div className="relative">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 text-center">
              <CardContent className="p-0">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-200 mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-gray-300">Learning in {testimonials[currentTestimonial].language}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 text-white hover:text-orange-400 hover:bg-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 text-white hover:text-orange-400 hover:bg-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-orange-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">ScribbleSense</h3>
              <p className="text-gray-300 leading-relaxed">
                Empowering multilingual learners with AI-driven educational tools for better writing and speaking skills.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  About
                </Link>
                <Link href="/contact" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  Contact
                </Link>
                <Link href="/privacy" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:contact@scribblesense.com"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400">
              © 2024 ScribbleSense. All rights reserved. Built with ❤️ for multilingual learners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}