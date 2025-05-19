import { axiosInstance } from './axios';
import { LP } from '../types/lp';

import { LPListResponse } from '../types/lp';

export interface LPDetailResponse {
  status: boolean;
  message: string;
  data: LP;
}

export const fetchLpByTag = async (tag: string): Promise<LPListResponse> => {
  const response = await axiosInstance.get('/v1/lps', { params: { tag } });
  return response.data;
};

export const getLPList = async (params: {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: 'asc' | 'desc';
}): Promise<LPListResponse> => {
  const response = await axiosInstance.get('/v1/lps', { params });
  // statusCode가 포함되어 있지 않으면 추가
  return {
    ...response.data,
    statusCode: response.status,
  };
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
  const response = await axiosInstance.post('/v1/lps', data);
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

 