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
  User,
  Loader2
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
  
  // OCR states
  const [ocrResult, setOcrResult] = useState<string>('');
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState<string>('');
  
  // Voice recording states
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcription, setTranscription] = useState('');
 const [recordingStatus, setRecordingStatus] = useState<
  'idle' | 'recording' | 'stopped' | 'saved' | 'processing' | 'error'
>('idle');
const languages = [
  { value: 'english', label: 'English', flag: '🇺🇸' },
  { value: 'hindi', label: 'Hindi', flag: '🇮🇳' },
  { value: 'punjabi', label: 'Punjabi', flag: '🇮🇳' },
];

  
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
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        setCanvasContext(ctx);
        
        // Set canvas background to dark for better visibility
        ctx.fillStyle = '#1a1b4b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setOcrResult('');
    setOcrError('');

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Auto-submit for OCR
    await submitFileToOCR(file);
  };

  const submitFileToOCR = async (file: File) => {
    setOcrLoading(true);
    setOcrError('');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('language', 'en');

    try {
      const response = await fetch('http://localhost:5000/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('✅ OCR Result from file:', data);

      if (data.success) {
        setOcrResult(data.data.extractedText || 'No text detected in the image.');
      } else {
        setOcrError(data.message || 'OCR processing failed.');
      }
    } catch (error) {
      console.error('❌ OCR Error:', error);
      setOcrError('Failed to connect to OCR service. Please try again.');
    } finally {
      setOcrLoading(false);
    }
  };

  // Fixed canvas drawing functions
  const getMousePos = (canvas: HTMLCanvasElement, event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasContext || !canvasRef.current) return;
    setIsDrawing(true);
    const pos = getMousePos(canvasRef.current, event);
    canvasContext.beginPath();
    canvasContext.moveTo(pos.x, pos.y);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasContext || !canvasRef.current) return;
    const pos = getMousePos(canvasRef.current, event);
    canvasContext.lineTo(pos.x, pos.y);
    canvasContext.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (canvasContext && canvasRef.current) {
      canvasContext.fillStyle = '#1a1b4b';
      canvasContext.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setOcrResult('');
      setOcrError('');
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

  const submitCanvasToOCR = async () => {
    if (!canvasRef.current) return;

    setOcrLoading(true);
    setOcrError('');

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) {
        setOcrError('Failed to convert canvas to image.');
        setOcrLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', blob, 'drawing.png');
      formData.append('language', 'en');

      try {
        const response = await fetch('http://localhost:5000/api/ocr', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log('🖋️ OCR Result from Canvas:', data);

        if (data.success) {
          setOcrResult(data.data.extractedText || 'No text detected in the drawing.');
        } else {
          setOcrError(data.message || 'OCR processing failed.');
        }
      } catch (error) {
        console.error('❌ Canvas OCR Error:', error);
        setOcrError('Failed to connect to OCR service. Please try again.');
      } finally {
        setOcrLoading(false);
      }
    }, 'image/png');
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

const transcribeAudio = async () => {
  if (!audioBlob) {
    setTranscription('❌ No audio recorded yet.');
    return;
  }

  setRecordingStatus('processing');
  setTranscription('🔄 Transcribing...');

  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('language', selectedLanguage); // 'english', 'hindi', or 'punjabi'

  try {
    const response = await fetch('http://localhost:5000/api/speech', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setTranscription(data.transcription || '✅ Transcription complete but empty.');
      setRecordingStatus('saved');
    } else {
      setTranscription(`❌ Transcription failed: ${data.message}`);
      setRecordingStatus('error');
    }
  } catch (error) {
    console.error('❌ Transcription Error:', error);
    setTranscription('❌ An error occurred during transcription.');
    setRecordingStatus('error');
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
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
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
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


              {/* OCR Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">📄 Text Recognition Results</h3>
                <div className="bg-white/5 rounded-lg border border-white/20 p-6 min-h-[300px]">
                  {ocrLoading ? (
                    <div className="text-center py-8">
                      <Loader2 className="w-8 h-8 border-orange-400 animate-spin mx-auto mb-4" />
                      <p className="text-gray-300">Processing your handwriting...</p>
                    </div>
                  ) : ocrError ? (
                    <div className="text-center py-8">
                      <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                      <p className="text-red-400 font-medium mb-2">Error</p>
                      <p className="text-gray-300 text-sm">{ocrError}</p>
                    </div>
                  ) : ocrResult ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Text Extracted Successfully</span>
                      </div>
                      <div className="bg-black/20 rounded p-4 border border-white/10">
                        <p className="text-white font-light leading-relaxed whitespace-pre-wrap">
                          {ocrResult}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 font-light py-8">
                      <FileImage className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Upload an image or draw something to see the extracted text here...</p>
                      <p className="text-sm mt-2">Our AI will analyze and convert your handwriting to digital text.</p>
                    </div>
                  )}
                </div>
              </div>
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