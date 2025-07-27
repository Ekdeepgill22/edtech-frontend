'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Settings, 
  Globe, 
  Palette, 
  Bell, 
  Shield, 
  ArrowLeft, 
  LogOut,
  Edit,
  Save,
  X,
  Camera
} from 'lucide-react';

// Mock user data - in real implementation, this would come from Clerk or your auth system
const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  imageUrl: '',
  joinedDate: '2024-01-15',
  preferences: {
    language: 'english',
    theme: 'dark',
    notifications: true,
    autoCorrect: true,
    learningGoal: 'intermediate',
    preferredVoice: 'natural'
  }
};

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(mockUser);

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    // In real implementation, save to backend/Clerk
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    // In real implementation, use Clerk signOut
    alert('Sign out functionality - would redirect to login');
  };

  const getUserInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return 'U';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5] text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/10 hover:text-orange-400 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Profile Settings
              </h1>
              <p className="text-gray-400 mt-1">Manage your account and preferences</p>
            </div>
          </div>
          
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-red-400/50 text-red-400 hover:bg-red-400/10 hover:border-red-400 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={user.imageUrl} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-2xl font-bold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="firstName" className="text-white text-sm">First Name</Label>
                      <Input
                        id="firstName"
                        value={editedUser.firstName}
                        onChange={(e) => setEditedUser({...editedUser, firstName: e.target.value})}
                        className="bg-white/10 border-white/20 text-white focus:border-orange-400/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white text-sm">Last Name</Label>
                      <Input
                        id="lastName"
                        value={editedUser.lastName}
                        onChange={(e) => setEditedUser({...editedUser, lastName: e.target.value})}
                        className="bg-white/10 border-white/20 text-white focus:border-orange-400/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white text-sm">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                        className="bg-white/10 border-white/20 text-white focus:border-orange-400/50"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} size="sm" variant="outline" className="flex-1">
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-gray-400 mb-2 flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {user.email}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      Member since {new Date(user.joinedDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                    <Button
                      onClick={() => setIsEditing(true)}
                      size="sm"
                      className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-orange-400" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Account Type</span>
                  <span className="text-orange-400 font-semibold">Premium</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Learning Streak</span>
                  <span className="text-green-400 font-semibold">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Grammar Score</span>
                  <span className="text-blue-400 font-semibold">87%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Language Preferences */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-orange-400" />
                  Language Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language" className="text-white">Primary Language</Label>
                  <Select value={user.preferences.language} onValueChange={(value) => 
                    setUser({...user, preferences: {...user.preferences, language: value}})
                  }>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-orange-400/50">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="english">🇺🇸 English</SelectItem>
                      <SelectItem value="hindi">🇮🇳 Hindi</SelectItem>
                      <SelectItem value="punjabi">🇮🇳 Punjabi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="learningGoal" className="text-white">Learning Goal</Label>
                  <Select value={user.preferences.learningGoal} onValueChange={(value) => 
                    setUser({...user, preferences: {...user.preferences, learningGoal: value}})
                  }>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-orange-400/50">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="beginner">📚 Beginner</SelectItem>
                      <SelectItem value="intermediate">📖 Intermediate</SelectItem>
                      <SelectItem value="advanced">🎓 Advanced</SelectItem>
                      <SelectItem value="professional">💼 Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* AI Settings */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-orange-400" />
                  AI & Interface Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="theme" className="text-white">Theme Preference</Label>
                  <Select value={user.preferences.theme} onValueChange={(value) => 
                    setUser({...user, preferences: {...user.preferences, theme: value}})
                  }>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-orange-400/50">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="dark">🌙 Dark Mode</SelectItem>
                      <SelectItem value="light">☀️ Light Mode</SelectItem>
                      <SelectItem value="auto">🔄 Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="voice" className="text-white">Preferred Voice</Label>
                  <Select value={user.preferences.preferredVoice} onValueChange={(value) => 
                    setUser({...user, preferences: {...user.preferences, preferredVoice: value}})
                  }>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-orange-400/50">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="natural">🎭 Natural</SelectItem>
                      <SelectItem value="professional">💼 Professional</SelectItem>
                      <SelectItem value="friendly">😊 Friendly</SelectItem>
                      <SelectItem value="formal">🎩 Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoCorrect" className="text-white">Auto-correct</Label>
                      <p className="text-gray-400 text-sm">Automatically fix common grammar mistakes</p>
                    </div>
                    <Switch
                      id="autoCorrect"
                      checked={user.preferences.autoCorrect}
                      onCheckedChange={(checked) => 
                        setUser({...user, preferences: {...user.preferences, autoCorrect: checked}})
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-400" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications" className="text-white">Enable Notifications</Label>
                    <p className="text-gray-400 text-sm">Receive updates about your learning progress</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={user.preferences.notifications}
                    onCheckedChange={(checked) => 
                      setUser({...user, preferences: {...user.preferences, notifications: checked}})
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-orange-400" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Change Password
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Download Data
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-red-400/50 text-red-400 hover:bg-red-400/10"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Need help? Visit our <Link href="/resources" className="text-orange-400 hover:text-orange-300">Help Center</Link> or contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
