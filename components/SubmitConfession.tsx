import { useState } from 'react';

interface SubmitConfessionProps {
  onSubmit: (content: string) => void;
  isLoading?: boolean;
}

export default function SubmitConfession({ onSubmit, isLoading = false }: SubmitConfessionProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <div className="submit-confession">
      <h2>Share Your Confession</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? (Anonymous)"
          maxLength={500}
          disabled={isLoading}
        />
        <div className="submit-footer">
          <span className="char-count">{content.length}/500</span>
          <button type="submit" disabled={!content.trim() || isLoading}>
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
