export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LP {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
  author?: Author;
}

export interface LPListResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: LP[];
    nextCursor: number;
    hasNext: boolean;
  };
}

export interface CursorBaseResponse<T> {
  data: T[];
  meta: {
    nextCursor?: number;
    hasNext: boolean;
  };
}

export type ResponseLpListDto = CursorBaseResponse<LP>;

export interface LPListParams {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: 'asc' | 'desc';
}

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  lpId: number;
  createdAt: string;
  updatedAt: string;
  author?: Author;
}

export interface CommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Comment[];
    nextCursor?: number;
    hasNext: boolean;
  };
}

