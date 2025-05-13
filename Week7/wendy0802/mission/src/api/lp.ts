import { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import axios from "axios";
import { 
  LP, 
  LPListResponse
} from "../types/lp";
import { RequestRefreshDto, ResponseRefreshDto } from "../types/auth";

export const getLPList = async (params: {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: 'asc' | 'desc';
}): Promise<LPListResponse> => {
  try {
    console.log("[LP API] LP 목록 요청:", params);
    const { data } = await axiosInstance.get("/v1/lps", {
      params,
    });
    console.log("[LP API] LP 목록 응답:", data);
    return data;
  } catch (error: any) {
    console.error("[LP API] LP 목록 조회 실패:", error);
    if (error.response?.status === 401) {
      throw new Error("인증이 필요합니다. 다시 로그인해주세요.");
    }
    throw new Error(error.response?.data?.message || "LP 목록을 불러오는데 실패했습니다.");
  }
};

export interface LPDetailResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LP;
}

export const getLPDetail = async (id: string): Promise<LPDetailResponse> => {
    const { data } = await axiosInstance.get(`/v1/lps/${id}`);
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
    window.location.href = "/v1/auth/login";
    return false;
  }
};

export interface CreateLPResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LP;
}

export const createLP = async (
  payload: {
    title: string;
    content: string;
    thumbnail: string; 
    tags: string[];
    published: boolean;
  },
  accessToken?: string
): Promise<CreateLPResponse> => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const url = `${baseURL}/v1/lps`;

  const token = accessToken || localStorage.getItem('accessToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await axios.post(url, payload, {
    headers,
    withCredentials: true,
  });

  return response.data;
};

 