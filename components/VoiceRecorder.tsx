'use client';

interface VoiceRecorderProps {
  onRecordingComplete?: (audio: Blob) => void;
}

export default function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  return (
    <div>
      <h3>Voice Recorder Component</h3>
    </div>
  );
}