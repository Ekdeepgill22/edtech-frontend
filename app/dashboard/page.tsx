'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  TrendingUp, 
  Target, 
  PenTool, 
  MessageSquare, 
  Upload, 
  BookOpen,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  BarChart3,
  PieChart,
  LineChart,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GrammarLineChart from '@/components/charts/GrammarLineChart';
import SpeakingBarChart from '@/components/charts/SpeakingBarChart';
import LanguagePieChart from '@/components/charts/LanguagePieChart';

// Mock authentication - replace with actual Clerk integration
const mockUser = {
  isAuthenticated: true,
  name: 'Priya Sharma',
  email: 'priya@example.com',
  joinDate: '2025-07-15'
};

// Mock data for charts and stats
const mockData = {
  grammarAccuracy: [
    { session: 1, accuracy: 65 },
    { session: 2, accuracy: 72 },
    { session: 3, accuracy: 68 },
    { session: 4, accuracy: 78 },
    { session: 5, accuracy: 82 },
    { session: 6, accuracy: 85 },
    { session: 7, accuracy: 88 }
  ],
  speakingScores: [
    { category: 'Pronunciation', score: 85 },
    { category: 'Fluency', score: 78 },
    { category: 'Grammar', score: 82 },
    { category: 'Vocabulary', score: 90 }
  ],
  languageDistribution: [
    { language: 'English', usage: 45, color: '#3B82F6' },
    { language: 'Hindi', usage: 35, color: '#10B981' },
    { language: 'Punjabi', usage: 20, color: '#F59E0B' }
  ],
  recentFeedback: [
    {
      id: 1,
      message: "Good sentence structure in your latest essay.",
      type: "grammar",
      timestamp: "2 hours ago",
      language: "English"
    },
    {
      id: 2,
      message: "Incorrect verb tense used in paragraph 2.",
      type: "grammar",
      timestamp: "5 hours ago",
      language: "Hindi"
    },
    {
      id: 3,
      message: "Great pronunciation on word 'important'.",
      type: "speaking",
      timestamp: "1 day ago",
      language: "English"
    }
  ],
  stats: {
    totalSubmissions: 47,
    averageAccuracy: 84,
    streakDays: 12,
    completedLessons: 23
  }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading and auth check
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!mockUser.isAuthenticated) {
        router.push('/login');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!mockUser.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5] flex items-center justify-center px-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 text-center max-w-md">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
            <p className="text-gray-300 mb-6">Please login to access your dashboard and track your learning progress.</p>
            <Link href="/login">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2">
                Sign In to Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'progress', label: 'Progress History', icon: TrendingUp },
    { id: 'goals', label: 'Learning Goals', icon: Target }
  ];

  const quickActions = [
    { label: 'Start Practice', href: '/practice', icon: PenTool, color: 'from-green-400 to-emerald-500' },
    { label: 'Check Grammar', href: '/grammar-check', icon: MessageSquare, color: 'from-blue-400 to-cyan-500' },
    { label: 'Upload Handwriting', href: '/docx-export', icon: Upload, color: 'from-purple-400 to-pink-500' },
    { label: 'Explore Resources', href: '/resources', icon: BookOpen, color: 'from-orange-400 to-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5]">
      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-black/20 backdrop-blur-sm border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{mockUser.name}</p>
                <p className="text-gray-400 text-xs">Member since July 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <div className="w-8"></div>
          </div>

          <div className="p-6">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {mockUser.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-300">
                Here's your learning progress and recent activity.
              </p>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Submissions</p>
                          <p className="text-2xl font-bold text-white">{mockData.stats.totalSubmissions}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Average Accuracy</p>
                          <p className="text-2xl font-bold text-white">{mockData.stats.averageAccuracy}%</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Learning Streak</p>
                          <p className="text-2xl font-bold text-white">{mockData.stats.streakDays} days</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Completed Lessons</p>
                          <p className="text-2xl font-bold text-white">{mockData.stats.completedLessons}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <LineChart className="w-5 h-5" />
                        <span>Grammar Accuracy Trend</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <GrammarLineChart data={mockData.grammarAccuracy} />
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5" />
                        <span>Speaking Performance</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SpeakingBarChart data={mockData.speakingScores} />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <PieChart className="w-5 h-5" />
                        <span>Language Usage</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LanguagePieChart data={mockData.languageDistribution} />
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2 bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-5 h-5" />
                          <span>Recent Feedback</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-orange-400 hover:text-orange-300">
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockData.recentFeedback.map((feedback) => (
                          <div key={feedback.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              feedback.type === 'grammar' ? 'bg-blue-400' : 'bg-green-400'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-gray-200 text-sm">{feedback.message}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-400">{feedback.language}</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-400">{feedback.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {quickActions.map((action, index) => (
                        <Link key={index} href={action.href}>
                          <Button className={`w-full h-20 bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center space-y-2 text-white border-0`}>
                            <action.icon className="w-6 h-6" />
                            <span className="text-sm font-medium">{action.label}</span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Progress History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Detailed Progress Coming Soon</h3>
                      <p className="text-gray-400">
                        We're working on comprehensive progress tracking features.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Learning Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Set Your Learning Goals</h3>
                      <p className="text-gray-400 mb-6">
                        Define your learning objectives and track your progress.
                      </p>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        Create Goals
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}