interface TranscriptionPreviewProps {
  text?: string;
}

export default function TranscriptionPreview({ text }: TranscriptionPreviewProps) {
  return (
    <div>
      <h3>Transcription Preview</h3>
      <p>{text || 'Transcription will appear here'}</p>
    </div>
  );
}