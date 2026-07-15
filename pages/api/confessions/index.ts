import type { NextApiRequest, NextApiResponse } from 'next';
import { Confession } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage (replace with database in production)
let confessions: Confession[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Confession | Confession[] | { error: string }>
) {
  if (req.method === 'GET') {
    // Return confessions sorted by newest first
    const sorted = [...confessions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return res.status(200).json(sorted);
  }

  if (req.method === 'POST') {
    const { content } = req.body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ error: 'Content is required' });
    }

    if (content.length > 500) {
      return res.status(400).json({ error: 'Content must be 500 characters or less' });
    }

    const confession: Confession = {
      id: uuidv4(),
      content: content.trim(),
      createdAt: new Date(),
      likes: 0,
      liked: false,
    };

    confessions.push(confession);
    return res.status(201).json(confession);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
