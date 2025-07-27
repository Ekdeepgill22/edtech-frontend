interface FeatureCardProps {
  title?: string;
  description?: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div>
      <h3>{title || 'Feature Card'}</h3>
      <p>{description || 'Feature description'}</p>
    </div>
  );
}