import { axiosInstance } from './axios';
import { LP } from '../types/lp';

export interface LPListResponse {
  status: boolean;
  message: string;
  data: {
    data: LP[];
    nextCursor: number | null;
    hasNext: boolean;
  };
}

export interface LPListResponse {
  status: boolean;
}

export interface LPDetailResponse {
  status: boolean;
  message: string;
  data: LP;
}

export const getLPList = async (params: {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: 'asc' | 'desc';
}): Promise<LPListResponse> => {
  const response = await axiosInstance.get('/v1/lps', { params });
  return response.data;
};

export const getLPDetail = async (id: string): Promise<LPDetailResponse> => {
  const response = await axiosInstance.get(`/v1/lps/${id}`);
  return response.data;
};

export const createLP = async (data: {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}): Promise<LPDetailResponse> => {
  // published를 string으로 변환하고, Authorization 헤더를 명시적으로 추가
  const payload = {
    ...data,
    published: String(data.published)
  };
  const response = await axiosInstance.post('/v1/lps', payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export interface CreateLPResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LP;
}

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
    window.location.href = "/v1/auth/login";
    return false;
  }
};

export interface RequestRefreshDto {
  refreshToken: string;
}

export interface ResponseRefreshDto {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

 