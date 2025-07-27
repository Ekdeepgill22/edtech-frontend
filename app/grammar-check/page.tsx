'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Send, Bot, User, Clock } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function GrammarCheck() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      // Mock AI response with grammar correction
      const correctedText = getCorrectedText(userMessage.content);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: correctedText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Mock grammar correction function
  const getCorrectedText = (text: string): string => {
    // Simple mock corrections - in real implementation, this would call an AI API
    const corrections = [
      { from: /i am going/gi, to: 'I am going' },
      { from: /tommorow/gi, to: 'tomorrow' },
      { from: /recieve/gi, to: 'receive' },
      { from: /its/gi, to: "it's" },
      { from: /there house/gi, to: 'their house' },
      { from: /alot/gi, to: 'a lot' }
    ];

    let corrected = text;
    corrections.forEach(({ from, to }) => {
      corrected = corrected.replace(from, to);
    });

    // Ensure first letter is capitalized
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
    
    // Ensure sentence ends with proper punctuation
    if (!/[.!?]$/.test(corrected)) {
      corrected += '.';
    }

    return `**Corrected:** ${corrected}`;
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 text-orange-400 animate-pulse">
      <Bot className="w-4 h-4" />
      <span className="text-sm">AI is thinking...</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );

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
                          : 'bg-gradient-to-r from-orange-400 to-orange-500'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <Card className={`${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30'
                          : 'bg-gradient-to-r from-orange-400/20 to-orange-500/20 border-orange-400/30'
                      } backdrop-blur-sm border-2 shadow-lg`}>
                        <CardContent className="p-3">
                          <div className={`${
                            message.content.includes('**Corrected:**') 
                              ? 'space-y-2' 
                              : ''
                          }`}>
                            {message.content.includes('**Corrected:**') ? (
                              <>
                                <div className="text-sm text-gray-300">
                                  {message.content.split('**Corrected:**')[0]}
                                </div>
                                <div className="font-medium text-white bg-green-500/20 p-2 rounded border border-green-400/30">
                                  {message.content.split('**Corrected:**')[1]}
                                </div>
                              </>
                            ) : (
                              <p className="text-white leading-relaxed">
                                {message.content}
                              </p>
                            )}
                          </div>
                          
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
                
                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-end space-x-3 max-w-xs">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <Card className="bg-gradient-to-r from-orange-400/20 to-orange-500/20 border-orange-400/30 backdrop-blur-sm border-2">
                        <CardContent className="p-3">
                          <TypingIndicator />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input Form */}
          <div className="border-t border-white/10 p-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a sentence in English, Hindi, or Punjabi..."
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
                Check Grammar
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
