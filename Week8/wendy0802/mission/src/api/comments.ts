import { axiosInstance } from './axios';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
}

export interface CommentListResponse {
  status: boolean;
  message: string;
  data: {
    data: Comment[];
    nextCursor: number | null;
    hasNext: boolean;
  };
}

export interface CreateCommentRequest {
  content: string;
}

export interface CreateCommentResponse {
  status: boolean;
  message: string;
  data: Comment;
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

export interface CommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Comment;
}

export interface DeleteCommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
  };
}

// 댓글 목록 조회
export const getComments = async (lpId: number, params: {
  cursor?: number;
  limit?: number;
  order?: 'asc' | 'desc';
}): Promise<CommentListResponse> => {
  const response = await axiosInstance.get(`/v1/lps/${lpId}/comments`, { params });
  return response.data;
};

// 댓글 생성
export const createComment = async (lpId: number, data: CreateCommentRequest): Promise<CreateCommentResponse> => {
  const response = await axiosInstance.post(`/v1/lps/${lpId}/comments`, data);
  return response.data;
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