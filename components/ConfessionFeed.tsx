import { Confession } from '@/types';
import ConfessionCard from './ConfessionCard';

interface ConfessionFeedProps {
  confessions: Confession[];
  onLike: (id: string) => void;
}

export default function ConfessionFeed({ confessions, onLike }: ConfessionFeedProps) {
  if (confessions.length === 0) {
    return (
      <div className="empty-state">
        <p>No confessions yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="confession-feed">
      {confessions.map((confession) => (
        <ConfessionCard
          key={confession.id}
          confession={confession}
          onLike={onLike}
        />
      ))}
    </div>
  );
}
