export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type CommentType = {
  data: Comment[];
  nextCursor?: number;
  hasNext: boolean;
};

export type RequestCommentDto = {
  content: string;
};
export type ResponseCommentDto = {
  status: boolean;
  statusCode: number;
  message: string;
  data: Comment;
};
