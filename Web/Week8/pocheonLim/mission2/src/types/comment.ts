export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
} 