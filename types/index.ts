export interface Confession {
  id: string;
  content: string;
  createdAt: Date;
  likes: number;
  liked?: boolean;
}
