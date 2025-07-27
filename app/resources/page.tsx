'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  BookOpen, 
  Play, 
  Clock, 
  Eye, 
  Globe, 
  Filter,
  ExternalLink,
  Star,
  Calendar,
  Users
} from 'lucide-react';

interface VideoResource {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  category: string;
  language: 'english' | 'hindi' | 'punjabi';
  type: 'video' | 'article';
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const mockResources: VideoResource[] = [
  // English Resources
  {
    id: '1',
    title: 'English Grammar Fundamentals: Complete Guide',
    description: 'Master the basics of English grammar with comprehensive examples and practice exercises.',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=225&fit=crop',
    duration: '12:45',
    views: '245K',
    uploadDate: '2 weeks ago',
    category: 'Grammar',
    language: 'english',
    type: 'video',
    tags: ['grammar', 'basics', 'english'],
    difficulty: 'beginner'
  },
  {
    id: '2',
    title: 'Advanced Writing Techniques for Professional Communication',
    description: 'Enhance your professional writing skills with advanced techniques and real-world examples.',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=225&fit=crop',
    duration: '18:30',
    views: '156K',
    uploadDate: '1 week ago',
    category: 'Writing',
    language: 'english',
    type: 'video',
    tags: ['writing', 'professional', 'communication'],
    difficulty: 'advanced'
  },
  {
    id: '3',
    title: 'OCR Technology: From Handwriting to Digital Text',
    description: 'Understanding how OCR works and best practices for handwriting recognition.',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=225&fit=crop',
    duration: '15:20',
    views: '89K',
    uploadDate: '3 days ago',
    category: 'Technology',
    language: 'english',
    type: 'video',
    tags: ['ocr', 'technology', 'handwriting'],
    difficulty: 'intermediate'
  },

  // Hindi Resources
  {
    id: '4',
    title: 'हिंदी व्याकरण की मूल बातें - संपूर्ण गाइड',
    description: 'हिंदी व्याकरण के मूलभूत नियमों को समझें और अपनी भाषा कौशल में सुधार करें।',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop',
    duration: '14:25',
    views: '178K',
    uploadDate: '5 days ago',
    category: 'व्याकरण',
    language: 'hindi',
    type: 'video',
    tags: ['व्याकरण', 'हिंदी', 'भाषा'],
    difficulty: 'beginner'
  },
  {
    id: '5',
    title: 'प्रभावी हिंदी लेखन तकनी��',
    description: 'सुंदर और प्रभावी हिंदी लेखन के लिए आवश्यक तकनीकों को सीखें।',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
    duration: '16:40',
    views: '134K',
    uploadDate: '1 week ago',
    category: 'लेखन',
    language: 'hindi',
    type: 'video',
    tags: ['लेखन', 'तकनीक', 'हिंदी'],
    difficulty: 'intermediate'
  },
  {
    id: '6',
    title: 'देवनागरी लिपि और हस्तलेखन सुधार',
    description: 'देवनागरी लिपि में सुंदर हस्तलेखन के लिए व्यावहारिक सुझाव।',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop',
    duration: '11:15',
    views: '92K',
    uploadDate: '4 days ago',
    category: 'हस्तलेखन',
    language: 'hindi',
    type: 'video',
    tags: ['देवनागरी', 'हस्तलेखन', 'सुधार'],
    difficulty: 'beginner'
  },

  // Punjabi Resources
  {
    id: '7',
    title: 'ਪੰਜਾਬੀ ਵਿਆਕਰਣ ਦੇ ਮੂਲ ਨਿਯਮ',
    description: 'ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਦੇ ਵਿਆਕਰਣ ਸਿੱਖੋ ਅਤੇ ਆਪਣੀ ਲਿਖਣ ਸ਼ੈਲੀ ਸੁਧਾਰੋ।',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
    duration: '13:30',
    views: '67K',
    uploadDate: '6 days ago',
    category: 'ਵਿਆਕਰਣ',
    language: 'punjabi',
    type: 'video',
    tags: ['ਵਿਆਕਰਣ', 'ਪੰਜਾਬੀ', 'ਭਾਸ਼ਾ'],
    difficulty: 'beginner'
  },
  {
    id: '8',
    title: 'ਗੁਰਮੁਖੀ ਲਿਪੀ ਵਿੱਚ ਸੁੰਦਰ ਲਿਖਾਈ',
    description: 'ਗੁਰਮੁਖੀ ਲਿਪੀ ਵਿੱਚ ਸੁੰਦਰ ਅਤੇ ਸਪੱਸ਼ਟ ਲਿਖਾਈ ਦੇ ਤਰੀਕੇ ਸਿੱਖੋ।',
    thumbnail: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400&h=225&fit=crop',
    duration: '10:50',
    views: '43K',
    uploadDate: '2 weeks ago',
    category: 'ਲਿਖਾਈ',
    language: 'punjabi',
    type: 'video',
    tags: ['ਗੁਰਮੁਖੀ', 'ਲਿਖਾਈ', 'ਸੁੰਦਰ'],
    difficulty: 'intermediate'
  },
  {
    id: '9',
    title: 'ਪੰਜਾਬੀ ਸਾਹਿਤ ਅਤੇ ਕਾਵਿ ਸ਼ੈਲੀ',
    description: 'ਪੰਜਾਬੀ ��ਾਹਿਤ ਦੀ ਸੁੰਦਰਤਾ ਅਤੇ ਕਾਵਿ ਸ਼ੈਲੀ ਦੀ ਸਮਝ ਪ੍ਰਾਪਤ ਕਰੋ।',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop',
    duration: '20:15',
    views: '29K',
    uploadDate: '1 week ago',
    category: 'ਸਾਹਿਤ',
    language: 'punjabi',
    type: 'video',
    tags: ['ਸਾਹਿਤ', 'ਕਾਵਿ', 'ਪੰਜਾਬੀ'],
    difficulty: 'advanced'
  }
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const languageLabels = {
    english: 'English',
    hindi: 'Hindi',
    punjabi: 'Punjabi'
  };

  const languageFlags = {
    english: '🇺🇸',
    hindi: '🇮🇳',
    punjabi: '🇮🇳'
  };

  const filteredResources = useMemo(() => {
    return mockResources.filter(resource => {
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      
      return matchesSearch && matchesLanguage && matchesType;
    });
  }, [searchQuery, selectedLanguage, selectedType]);

  const resourcesByLanguage = useMemo(() => {
    const grouped = filteredResources.reduce((acc, resource) => {
      if (!acc[resource.language]) {
        acc[resource.language] = [];
      }
      acc[resource.language].push(resource);
      return acc;
    }, {} as Record<string, VideoResource[]>);
    
    return grouped;
  }, [filteredResources]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const handleWatchVideo = (videoId: string) => {
    // Simulate opening video - in real implementation, this would open YouTube
    alert(`Opening video ${videoId} - This will integrate with YouTube API later!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5] text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-10 h-10 text-orange-400 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Learning Resources
            </h1>
          </div>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Explore curated educational content in multiple languages to enhance your learning journey
          </p>
        </div>

        {/* Filter and Search Bar */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by concept or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400/50 focus:ring-orange-400/20"
                />
              </div>

              {/* Language Filter */}
              <div className="w-full md:w-48">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-orange-400/50">
                    <Globe className="w-4 h-4 mr-2 text-orange-400" />
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="english">🇺🇸 English</SelectItem>
                    <SelectItem value="hindi">🇮🇳 Hindi</SelectItem>
                    <SelectItem value="punjabi">🇮🇳 Punjabi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="w-full md:w-40">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-orange-400/50">
                    <Filter className="w-4 h-4 mr-2 text-orange-400" />
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="article">Articles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {(searchQuery || selectedLanguage !== 'all' || selectedType !== 'all') && (
              <div className="flex flex-wrap gap-2 mt-4">
                {searchQuery && (
                  <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border border-orange-400/30">
                    Search: "{searchQuery}"
                  </Badge>
                )}
                {selectedLanguage !== 'all' && (
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border border-blue-400/30">
                    {languageFlags[selectedLanguage as keyof typeof languageFlags]} {languageLabels[selectedLanguage as keyof typeof languageLabels]}
                  </Badge>
                )}
                {selectedType !== 'all' && (
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border border-purple-400/30">
                    {selectedType === 'video' ? '📹' : '📄'} {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}s
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-8 text-center">
          <p className="text-gray-400">
            Found <span className="text-orange-400 font-semibold">{filteredResources.length}</span> resources
            {selectedLanguage !== 'all' && (
              <> in <span className="text-blue-400 font-semibold">{languageLabels[selectedLanguage as keyof typeof languageLabels]}</span></>
            )}
          </p>
        </div>

        {/* Resources by Language */}
        <div className="space-y-12">
          {Object.entries(resourcesByLanguage).map(([language, resources]) => (
            <div key={language} className="animate-fade-in">
              {/* Language Section Header */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">
                    {languageFlags[language as keyof typeof languageFlags]}
                  </span>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    {languageLabels[language as keyof typeof languageLabels]} Resources
                  </h2>
                </div>
                <div className="flex-1 ml-4">
                  <Separator className="bg-white/20" />
                </div>
                <Badge variant="secondary" className="ml-4 bg-orange-500/20 text-orange-400 border border-orange-400/30">
                  {resources.length} {resources.length === 1 ? 'resource' : 'resources'}
                </Badge>
              </div>

              {/* Videos Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Play className="w-5 h-5 mr-2 text-orange-400" />
                  Videos
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources
                    .filter(resource => resource.type === 'video')
                    .map((resource) => (
                    <Card 
                      key={resource.id} 
                      className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer overflow-hidden"
                    >
                      {/* Video Thumbnail */}
                      <div className="relative">
                        <img 
                          src={resource.thumbnail} 
                          alt={resource.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-orange-500/90 rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                        
                        {/* Duration Badge */}
                        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {resource.duration}
                        </div>

                        {/* Difficulty Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className={`text-xs border ${getDifficultyColor(resource.difficulty)}`}>
                            {resource.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                          {resource.title}
                        </h4>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                        
                        {/* Video Stats */}
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {resource.views} views
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {resource.uploadDate}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {resource.tags.slice(0, 3).map((tag, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="text-xs bg-blue-500/20 text-blue-400 border border-blue-400/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Watch Button */}
                        <Button
                          onClick={() => handleWatchVideo(resource.id)}
                          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Articles Section */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                  Articles
                  <Badge variant="secondary" className="ml-2 bg-blue-500/20 text-blue-400 border border-blue-400/30 text-xs">
                    Coming Soon
                  </Badge>
                </h3>
                
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 border-dashed">
                  <CardContent className="p-8 text-center">
                    <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">
                      Article resources will be available soon
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      We're curating high-quality written content for {languageLabels[language as keyof typeof languageLabels]} learners
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No resources found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or browse all available content
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('all');
                setSelectedType('all');
              }}
              className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white"
            >
              Show All Resources
            </Button>
          </div>
        )}

        {/* Integration Note */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg p-6">
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <ExternalLink className="w-4 h-4 mr-2 text-blue-400" />
            Integration Ready
          </h4>
          <p className="text-gray-300 text-sm">
            This page is prepared for YouTube API integration. Video links will connect to real content once the backend API endpoint <code className="bg-black/30 px-1 rounded text-orange-400">/api/resources</code> is implemented.
          </p>
        </div>
      </div>
    </div>
  );
}
