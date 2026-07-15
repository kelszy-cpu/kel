import type { NextApiRequest, NextApiResponse } from 'next';

// This would connect to your database in production
// For now, returning a success response
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ likes: number } | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  // TODO: Implement database like tracking
  // For now, return a mock response
  return res.status(200).json({ likes: Math.floor(Math.random() * 100) });
}
