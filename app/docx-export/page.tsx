'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  X, 
  Image as ImageIcon, 
  FileType,
  CheckCircle,
  Loader2,
  Sparkles
} from 'lucide-react';

interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

export default function DocxExport() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/pdf'
  ];

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="w-8 h-8 text-blue-400" />;
    } else if (file.type === 'application/pdf') {
      return <FileType className="w-8 h-8 text-red-400" />;
    }
    return <FileText className="w-8 h-8 text-gray-400" />;
  };

  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve(''); // PDF files don't need preview
      }
    });
  };

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(file => 
      acceptedTypes.includes(file.type)
    );

    if (validFiles.length === 0) {
      alert('Please select valid image files (.jpg, .jpeg, .png) or PDF documents.');
      return;
    }

    const newFiles: UploadedFile[] = [];
    
    for (const file of validFiles) {
      const preview = await createFilePreview(file);
      newFiles.push({
        file,
        preview,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      });
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const simulateOCR = async () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one file first.');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate OCR processing with progress
    const progressSteps = [10, 25, 45, 70, 85, 100];
    const mockTexts = [
      "Analyzing document structure...",
      "Detecting text regions...",
      "Performing character recognition...",
      "Processing multilingual content...",
      "Applying AI corrections...",
      "Finalizing extracted text..."
    ];

    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingProgress(progressSteps[i]);
    }

    // Mock extracted text based on file types
    const sampleTexts = [
      "In the bustling marketplace of ideas, education stands as the cornerstone of human progress. ScribbleSense represents a revolutionary approach to multilingual learning, where technology meets tradition in perfect harmony.\n\nThis handwritten note discusses the importance of accessible education in multiple languages. The integration of AI-powered tools helps bridge the gap between different linguistic communities, making learning more inclusive and effective.\n\nKey points covered:\n• Grammar correction across languages\n• Voice-to-text transcription\n• Real-time feedback systems\n• Cultural sensitivity in language learning\n\nThe future of education lies in embracing diversity while maintaining quality standards.",
      
      "��हत्वपूर्ण नोट्स:\n\nभाषा सीखना एक कला है जो धैर्य और अभ्यास से आती है। ScribbleSense का उपयोग करते समय निम्नलिखित बातों का ध्यान रखें:\n\n1. नियमित अभ्यास करें\n2. व्याकरण की जांच करें\n3. उच्चारण पर ध्यान दें\n4. विभिन्न भाषाओं में लिखने का अभ्यास करें\n\nयह तकनीक हमारी भाषा सीखने की प्रक्रिया को बेहतर बनाती है।",
      
      "ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਦੇ ਮਹੱਤਵਪੂਰਣ ਨੋਟਸ:\n\nਭਾਸ਼ਾ ਸਿੱਖਣ ਵਿੱਚ ਤਕਨਾਲੋਜੀ ਦਾ ਵਰਤੋਂ ਬਹੁਤ ਫਾਇਦੇਮੰਦ ਹੈ। ScribbleSense ਸਾਡੀ ਮਦਦ ਕਰਦਾ ਹੈ:\n\n• ਗਲਤੀਆਂ ਸੁਧਾਰਨ ਵਿੱਚ\n• ਆਵਾਜ਼ ਨੂੰ ਲਿਖਤ ਵਿੱਚ ਬਦਲਣ ਵਿੱਚ\n• ਵਿਆਕਰਣ ਸਿੱਖਣ ਵਿੱਚ\n\nਇਹ ਸਾਧਨ ਸਾਡੇ ਲਈ ਬਹੁਤ ਮਦਦ��ਾਰ ਹੈ।"
    ];

    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setExtractedText(randomText);
    setIsProcessing(false);
  };

  const exportToDocx = async () => {
    if (!extractedText.trim()) {
      alert('No text available to export. Please extract text first.');
      return;
    }

    setIsExporting(true);
    
    // Simulate export processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a simple text blob (in real implementation, use docx library)
    const docxContent = `
ScribbleSense - AI-Formatted Document
=====================================

Extracted Text Content:
${extractedText}

---
Generated by ScribbleSense AI
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
`;

    // Create and trigger download
    const blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ScribbleSense_Export_${Date.now()}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c2a] via-[#1a1b4b] to-[#2b00b5] text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-10 h-10 text-orange-400 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              DOCX Export
            </h1>
          </div>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Upload handwritten notes or documents and export extracted text as a professionally formatted Word document
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Section */}
          <div className="space-y-6">
            {/* File Upload */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Upload className="w-5 h-5 mr-2 text-orange-400" />
                  Upload Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    isDragActive 
                      ? 'border-orange-400 bg-orange-400/10' 
                      : 'border-white/20 hover:border-orange-400/50 hover:bg-white/5'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Upload className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Drop files here or click to browse
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Supports: JPG, JPEG, PNG, PDF files
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <FileText className="w-5 h-5 mr-2 text-green-400" />
                    Uploaded Files ({uploadedFiles.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                  {uploadedFiles.map((uploadedFile) => (
                    <div key={uploadedFile.id} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3">
                      {uploadedFile.preview ? (
                        <img 
                          src={uploadedFile.preview} 
                          alt="Preview" 
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-600 rounded">
                          {getFileIcon(uploadedFile.file)}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium truncate">
                          {uploadedFile.file.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {formatFileSize(uploadedFile.file.size)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* OCR Processing Button */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardContent className="p-6">
                <Button
                  onClick={simulateOCR}
                  disabled={uploadedFiles.length === 0 || isProcessing}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing OCR...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Extract Text with AI
                    </>
                  )}
                </Button>
                
                {isProcessing && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Processing...</span>
                      <span>{processingProgress}%</span>
                    </div>
                    <Progress value={processingProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview and Export */}
          <div className="space-y-6">
            {/* Text Preview */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Eye className="w-5 h-5 mr-2 text-green-400" />
                  Preview before Export
                </CardTitle>
              </CardHeader>
              <CardContent>
                {extractedText ? (
                  <div className="space-y-4">
                    <Textarea
                      value={extractedText}
                      onChange={(e) => setExtractedText(e.target.value)}
                      className="min-h-[400px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400/50 focus:ring-green-400/20 resize-none"
                      placeholder="Extracted text will appear here..."
                    />
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>✓ Text extracted successfully</span>
                      <span>{extractedText.length} characters</span>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[400px] border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center text-center">
                    <div>
                      <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">
                        Upload files and extract text to see preview
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Export Action */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardContent className="p-6">
                <Button
                  onClick={exportToDocx}
                  disabled={!extractedText.trim() || isExporting}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-4 text-xl font-bold rounded-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      Generating SmartDoc...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6 mr-3" />
                      Generate SmartDoc
                    </>
                  )}
                </Button>
                
                {extractedText && (
                  <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                      Ready to export as AI-formatted Word document
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Export Info */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                SmartDoc Features
              </h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• AI-optimized formatting and structure</li>
                <li>• Multilingual text preservation</li>
                <li>• Professional document layout</li>
                <li>• Compatible with Microsoft Word</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
