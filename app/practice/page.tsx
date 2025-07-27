'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Upload, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw, 
  Save, 
  FileImage, 
  Volume2,
  Languages,
  Clock,
  CheckCircle,
  AlertCircle,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

// Mock authentication - replace with actual Clerk integration
const mockUser = {
  isAuthenticated: true,
  name: 'Priya Sharma'
};

export default function Practice() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Handwriting states
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  
  // Voice recording states
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'stopped' | 'saved'>('idle');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    // Initialize canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        setCanvasContext(ctx);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-light">Loading practice session...</p>
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
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
            <p className="text-gray-300 mb-6 font-light">Please login to access the practice session and start improving your skills.</p>
            <Button 
              onClick={() => router.push('/login')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
            >
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handwriting functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasContext) return;
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      canvasContext.beginPath();
      canvasContext.moveTo(event.clientX - rect.left, event.clientY - rect.top);
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasContext) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      canvasContext.lineTo(event.clientX - rect.left, event.clientY - rect.top);
      canvasContext.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (canvasContext && canvasRef.current) {
      canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const saveCanvas = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      const link = document.createElement('a');
      link.download = 'handwriting.png';
      link.href = dataUrl;
      link.click();
    }
  };

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setRecordingStatus('stopped');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingStatus('recording');
      setRecordingTime(0);

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const url = URL.createObjectURL(audioBlob);
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const transcribeAudio = () => {
    // Simulate transcription - replace with actual API call
    setTranscription('Loading transcription...');
    setTimeout(() => {
      const mockTranscriptions = {
        english: "Hello, this is a sample transcription of your English speech. The AI has converted your voice to text successfully.",
        hindi: "नमस्ते, यह आपके हिंदी भाषण का एक नमूना प्रतिलेखन है। AI ने आपकी आवाज़ को सफलतापूर्वक टेक्स्ट में बदल दिया है।",
        punjabi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਇਹ ਤੁਹਾਡੇ ਪੰਜਾਬੀ ਭਾਸ਼ਣ ਦਾ ਇੱਕ ਨਮੂਨਾ ਪ੍ਰਤਿਲੇਖਨ ਹੈ। AI ਨੇ ਤੁਹਾਡੀ ਆਵਾਜ਼ ਨੂੰ ਸਫਲਤਾਪੂਰਵਕ ਟੈਕਸਟ ਵਿੱਚ ਬਦਲ ਦਿੱਤਾ ਹੈ।"
      };
      setTranscription(mockTranscriptions[selectedLanguage as keyof typeof mockTranscriptions]);
      setRecordingStatus('saved');
    }, 2000);
  };

  const languages = [
    { value: 'english', label: 'English', flag: '🇺🇸' },
    { value: 'hindi', label: 'Hindi', flag: '🇮🇳' },
    { value: 'punjabi', label: 'Punjabi', flag: '🇮🇳' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">Practice Session</h1>
          <p className="text-xl text-gray-300 font-light">
            Welcome back, {mockUser.name}! Let's improve your skills today.
          </p>
        </div>

        {/* Section 1: Handwriting Upload & Pad */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FileImage className="w-6 h-6" />
              <span>Upload or Write Your Handwriting</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">📤 Upload Image</h3>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-orange-400 transition-colors duration-300">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 font-light">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      JPG, PNG, or PDF (max 10MB)
                    </p>
                  </label>
                </div>
                
                {previewUrl && (
                  <div className="mt-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full h-48 object-contain rounded-lg border border-white/20"
                    />
                    <p className="text-sm text-gray-400 mt-2">
                      File: {uploadedFile?.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Live Writing Pad */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">✍️ Live Writing Pad</h3>
                <div className="bg-black/20 rounded-lg p-4 border border-white/20">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={300}
                    className="w-full h-64 bg-white/10 rounded cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                  <div className="flex space-x-2 mt-4">
                    <Button
                      onClick={clearCanvas}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                    <Button
                      onClick={saveCanvas}
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Submit Handwriting
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Voice Practice */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Mic className="w-6 h-6" />
              <span>Practice Speaking</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-white font-medium flex items-center space-x-2">
                <Languages className="w-5 h-5" />
                <span>Select Language</span>
              </label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-white/20">
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="text-white hover:bg-white/10">
                      <span className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recording Controls */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🎙️ Voice Recording</h3>
                
                {/* Recording Button */}
                <div className="text-center space-y-4">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-24 h-24 rounded-full text-white transition-all duration-300 ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-orange-500 hover:bg-orange-600 hover:scale-105'
                    }`}
                  >
                    {isRecording ? (
                      <MicOff className="w-8 h-8" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </Button>
                  
                  <div className="space-y-2">
                    <p className="text-white font-medium">
                      {recordingStatus === 'idle' && 'Ready to Record'}
                      {recordingStatus === 'recording' && 'Recording...'}
                      {recordingStatus === 'stopped' && 'Recording Complete'}
                      {recordingStatus === 'saved' && 'Transcription Ready'}
                    </p>
                    
                    {isRecording && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-gray-300">
                          <Clock className="w-4 h-4" />
                          <span>{recordingTime}s / 30s</span>
                        </div>
                        <Progress value={(recordingTime / 30) * 100} className="w-full" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Playback Controls */}
                {audioBlob && (
                  <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium">Playback</h4>
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={isPlaying ? pauseRecording : playRecording}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 mr-2" />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        {isPlaying ? 'Pause' : 'Play'}
                      </Button>
                      <Volume2 className="w-4 h-4 text-gray-400" />
                    </div>
                    <audio ref={audioRef} className="hidden" />
                  </div>
                )}
              </div>

              {/* Transcription Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">📄 Transcription</h3>
                
                <div className="bg-white/5 rounded-lg border border-white/20 p-6 min-h-[200px]">
                  {!transcription ? (
                    <div className="text-center text-gray-400 font-light">
                      <p>Transcribed output will appear here...</p>
                      <p className="text-sm mt-2">Record your voice and click "Transcribe" to see the results.</p>
                    </div>
                  ) : transcription === 'Loading transcription...' ? (
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-300">Processing your speech...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Transcription Complete</span>
                      </div>
                      <p className="text-white font-light leading-relaxed">
                        {transcription}
                      </p>
                    </div>
                  )}
                </div>

                {audioBlob && !transcription && (
                  <Button
                    onClick={transcribeAudio}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Transcribe Audio
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}