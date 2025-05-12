export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  likes: {
    id: number;
    userId: number;
    lpId: number;
  }[];
}

export interface LpDetail extends Lp {
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
  audioUrl?: string;
} 