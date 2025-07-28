'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Send, Bot, User, Clock, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'loading' | 'error';
  content: string;
  timestamp: Date;
  originalText?: string; // For storing original text in AI responses
}

interface GrammarAPIResponse {
  success: boolean;
  message: string;
  data?: {
    originalText: string;
    correctedText: string;
    errors: Array<{
      type: string;
      message: string;
      position?: number;
    }>;
    suggestions: string[];
    overallScore: number;
    language: string;
    checkType: string;
    statistics: {
      totalErrors: number;
      readabilityScore: number;
      wordCount: number;
    };
    processingTime: number;
  };
  error?: string;
}

export default function GrammarCheck() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // API call function
  const callGrammarAPI = async (text: string, language: string = 'en'): Promise<GrammarAPIResponse> => {
    const response =  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/grammar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text.trim(),
        language: language,
        checkType: 'comprehensive'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ success: false, message: 'Network error occurred' }));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;

    const userInput = inputText.trim();

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Add loading message
    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'loading',
      content: 'Analyzing your text...',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Call the grammar API
      const response = await callGrammarAPI(userInput, selectedLanguage);

      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));

      if (response.success && response.data) {
        const { correctedText, originalText, errors, suggestions, statistics } = response.data;
        
        // Create AI response message
        let aiContent = '';
        
        if (correctedText && correctedText !== originalText) {
          aiContent = `**Corrected Text:**\n${correctedText}\n\n`;
          
          if (errors.length > 0) {
            aiContent += `**Issues Found (${errors.length}):**\n`;
            errors.slice(0, 3).forEach((error, index) => {
              aiContent += `${index + 1}. ${error.message}\n`;
            });
            aiContent += '\n';
          }
          
          if (suggestions.length > 0) {
            aiContent += `**Suggestions:**\n`;
            suggestions.slice(0, 2).forEach((suggestion, index) => {
              aiContent += `• ${suggestion}\n`;
            });
          }
        } else {
          aiContent = `✅ **Great work!** Your text looks grammatically correct.\n\n**Statistics:**\n• Word count: ${statistics.wordCount}\n• Error count: ${statistics.totalErrors}`;
        }

        const aiMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          type: 'ai',
          content: aiContent,
          timestamp: new Date(),
          originalText: originalText
        };

        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(response.message || 'Failed to process grammar check');
      }
    } catch (error) {
      console.error('Grammar API Error:', error);
      
      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 3).toString(),
        type: 'error',
        content: `Sorry, I couldn't process your text right now. ${error instanceof Error ? error.message : 'Please try again later.'}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 text-orange-400 animate-pulse">
      <Bot className="w-4 h-4" />
      <span className="text-sm">AI is analyzing...</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );

  const renderMessageContent = (message: ChatMessage) => {
    if (message.type === 'loading') {
      return <TypingIndicator />;
    }

    if (message.type === 'error') {
      return (
        <div className="flex items-start space-x-2 text-red-300">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">{message.content}</p>
        </div>
      );
    }

    // Handle AI messages with markdown-like formatting
    if (message.type === 'ai' && message.content.includes('**')) {
      return (
        <div className="space-y-2">
          {message.content.split('\n').map((line, index) => {
            if (line.includes('**Corrected Text:**')) {
              return (
                <div key={index} className="font-semibold text-green-300 border-l-2 border-green-400 pl-3">
                  {line.replace('**Corrected Text:**', '✨ Corrected Text:')}
                </div>
              );
            } else if (line.includes('**Issues Found')) {
              return (
                <div key={index} className="font-semibold text-yellow-300 mt-3">
                  {line.replace(/\*\*/g, '')}
                </div>
              );
            } else if (line.includes('**Suggestions:**')) {
              return (
                <div key={index} className="font-semibold text-blue-300 mt-3">
                  {line.replace(/\*\*/g, '')}
                </div>
              );
            } else if (line.includes('**Great work!**')) {
              return (
                <div key={index} className="font-semibold text-green-300">
                  {line.replace(/\*\*/g, '')}
                </div>
              );
            } else if (line.includes('**Statistics:**')) {
              return (
                <div key={index} className="font-semibold text-gray-300 mt-3">
                  {line.replace(/\*\*/g, '')}
                </div>
              );
            } else if (line.trim()) {
              return (
                <p key={index} className="leading-relaxed">
                  {line}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }

    return (
      <p className="text-white leading-relaxed">
        {message.content}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5] text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-orange-400 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Grammar Check
            </h1>
          </div>
          <p className="text-xl text-gray-300 font-light">
            AI-powered grammar correction for English, Hindi, and Punjabi
          </p>
        </div>

        {/* Language Selector */}
        <div className="mb-6 text-center">
          <div className="inline-flex bg-white/10 rounded-lg p-1 backdrop-blur-sm border border-white/20">
            {[
              { code: 'en', label: 'English', flag: '🇺🇸' },
              { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
              { code: 'pa', label: 'Punjabi', flag: '🇮🇳' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedLanguage === lang.code
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex flex-col h-[70vh] bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Bot className="w-16 h-16 text-orange-400 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400 text-lg">
                    Start a conversation by typing a sentence below
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    I'll help you with grammar corrections in multiple languages
                  </p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-3 max-w-xs sm:max-w-md md:max-w-lg ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                    }`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : message.type === 'error'
                          ? 'bg-gradient-to-r from-red-400 to-red-500'
                          : 'bg-gradient-to-r from-orange-400 to-orange-500'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : message.type === 'error' ? (
                          <AlertCircle className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <Card className={`${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30'
                          : message.type === 'error'
                          ? 'bg-gradient-to-r from-red-400/20 to-red-500/20 border-red-400/30'
                          : message.type === 'loading'
                          ? 'bg-gradient-to-r from-orange-400/20 to-orange-500/20 border-orange-400/30'
                          : 'bg-gradient-to-r from-orange-400/20 to-orange-500/20 border-orange-400/30'
                      } backdrop-blur-sm border-2 shadow-lg`}>
                        <CardContent className="p-3">
                          {renderMessageContent(message)}
                          
                          {/* Timestamp */}
                          <div className={`flex items-center mt-2 text-xs text-gray-400 ${
                            message.type === 'user' ? 'justify-end' : 'justify-start'
                          }`}>
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(message.timestamp)}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-white/10 p-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Type a sentence in ${selectedLanguage === 'en' ? 'English' : selectedLanguage === 'hi' ? 'Hindi' : 'Punjabi'}...`}
                  className="min-h-[60px] max-h-32 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400/50 focus:ring-orange-400/20 resize-none"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
              </div>
              <Button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-2 font-semibold rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 h-auto"
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? 'Checking...' : 'Check Grammar'}
              </Button>
            </form>
            
            <div className="mt-3 text-xs text-gray-400 text-center">
              <p>Press Enter to send • Shift+Enter for new line</p>
            </div>
          </div>
        </div>

        {/* Language Support Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Supports grammar checking in <span className="text-orange-400 font-medium">English</span>, <span className="text-orange-400 font-medium">Hindi</span>, and <span className="text-orange-400 font-medium">Punjabi</span>
          </p>
        </div>
      </div>
    </div>
  );
}