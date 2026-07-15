import { useState } from 'react';
import { Confession } from '@/types';

interface ConfessionCardProps {
  confession: Confession;
  onLike: (id: string) => void;
}

export default function ConfessionCard({ confession, onLike }: ConfessionCardProps) {
  const [liked, setLiked] = useState(confession.liked || false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(confession.id);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="confession-card">
      <div className="confession-content">{confession.content}</div>
      <div className="confession-footer">
        <span className="confession-date">{formatDate(confession.createdAt)}</span>
        <button
          className={`like-button ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          ❤️ {confession.likes}
        </button>
      </div>
    </div>
  );
}
