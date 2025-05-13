import { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import axios from "axios";
import { 
  LP, 
  LPListResponse, 
  CommentResponse,
  Comment,
  CursorBaseResponse
} from "../types/lp";
import { RequestRefreshDto, ResponseRefreshDto } from "../types/auth";


export const getLPList = async (paginationDto: PaginationDto): Promise<LPListResponse> => {
    const { data } = await axiosInstance.get("lps", {
      params: paginationDto,
    });
    return data;
};


export interface LPDetailResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LP;
}

export const getLPDetail = async (id: string): Promise<LPDetailResponse> => {
    const { data } = await axiosInstance.get(`lps/${id}`);
    return data;
};


export type CommentParams = { 
  cursor?: number; 
  limit?: number; 
  order?: 'asc' | 'desc' 
};

export const getComments = async (lpId: string | number, params: CommentParams): Promise<CommentResponse> => {
  console.log("[댓글 API] 요청 URL:", `lps/${lpId}/comments`);
  console.log("[댓글 API] 요청 파라미터:", params);

  try {
    // API URL 구성 - 환경 변수가 없을 경우 기본값 사용
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const url = `${baseURL}/v1/lps/${lpId}/comments`;

    console.log("[댓글 API] 최종 요청 URL:", url);

    // 인증과 무관하게 호출하기 위해 axiosInstance 대신 기본 axios 인스턴스 사용
    const { data } = await axios.get(url, {
      params,
      withCredentials: true
    });

    console.log("[댓글 API] 응답 데이터:", data);
    return data;
  } catch (error) {
    console.error("[댓글 API] 오류 발생:", error);
    throw error;
  }
};

export interface CreateCommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Comment;
}

export const createComment = async (lpId: string | number, content: string): Promise<CreateCommentResponse> => {
  const { data } = await axiosInstance.post(`lps/${lpId}/comments`, { content });
  return data;
};


export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    const response = await axiosInstance.post<ResponseRefreshDto>(
      "auth/refresh",
      { refreshToken } as RequestRefreshDto
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return true;
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = "/login";
    return false;
  }
};

export async function createLP(data: {
  title: string;
  content: string;
  thumbnail: File;
  tags: string[];
  published: boolean;
}) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('thumbnail', data.thumbnail);
  data.tags.forEach(tag => formData.append('tags', tag));
  formData.append('published', String(data.published));

  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const response = await axios.post(`${baseURL}/v1/lps`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
  });
  return response.data;
}
 