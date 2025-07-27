interface UploadCardProps {
  onUpload?: (file: File) => void;
}

export default function UploadCard({ onUpload }: UploadCardProps) {
  return (
    <div>
      <h3>Upload Card Component</h3>
    </div>
  );
}