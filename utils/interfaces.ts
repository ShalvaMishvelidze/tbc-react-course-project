export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  owner_id: string;
  likes: number;
  dislikes: number;
  views: number;
  created_at: string;
  updated_at: string;
}
