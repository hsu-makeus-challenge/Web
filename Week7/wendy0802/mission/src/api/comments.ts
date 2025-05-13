import { axiosInstance } from './axios';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

interface Author {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

interface CommentListResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Comment[];
    nextCursor: number;
    hasNext: boolean;
  };
}

interface CommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Comment;
}

interface DeleteCommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
  };
}

// 댓글 목록 조회
export const getComments = async (
  lpId: number,
  params?: {
    cursor?: number;
    limit?: number;
    order?: 'asc' | 'desc';
  }
): Promise<CommentListResponse> => {
  const { data } = await axios.get(`${baseURL}/v1/lps/${lpId}/comments`, {
    params: {
      cursor: params?.cursor,
      limit: params?.limit || 10,
      order: params?.order || 'asc'
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
  });
  return data;
};

// 댓글 생성
export const createComment = async (
  lpId: number,
  content: string
): Promise<CommentResponse> => {
  const { data } = await axios.post(
    `${baseURL}/v1/lps/${lpId}/comments`,
    { content },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      withCredentials: true
    }
  );
  return data;
};

// 댓글 수정
export const updateComment = async (
  lpId: number,
  commentId: number,
  content: string
): Promise<CommentResponse> => {
  const { data } = await axios.patch(
    `${baseURL}/v1/lps/${lpId}/comments/${commentId}`,
    { content },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      withCredentials: true
    }
  );
  return data;
};

// 댓글 삭제
export const deleteComment = async (
  lpId: number,
  commentId: number
): Promise<DeleteCommentResponse> => {
  const { data } = await axios.delete(
    `${baseURL}/v1/lps/${lpId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      withCredentials: true
    }
  );
  return data;
}; 