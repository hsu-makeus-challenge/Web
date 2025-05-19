import type {
  RequestSignupDto,
  ResponseSignupDto,
  RequestSigninDto,
  ResponseSigninDto,
  ResponseMyinfoDto,
  RequestLogoutDto,
  ResponseLogoutDto,
  RequestRefreshDto,
  ResponseRefreshDto,
} from '../types/auth';
import { axiosInstance } from './axios';
import axios from 'axios';
import { ApiResponse, LoginResponse, UserInfo } from '../types/api';

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

export type LoginRequest = RequestSigninDto;


export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
  const { data } = await axios.post(`${baseURL}/v1/auth/signup`, body, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
  return data;
};


export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post(`${baseURL}/v1/auth/signin`, body, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
  return data;
};

interface LoginData {
  email: string;
  password: string;
}

export const loginApi = async (data: LoginData, p0: string): Promise<ApiResponse<LoginResponse>> => {
  const response = await axios.post<ApiResponse<LoginResponse>>('/v1/auth/login', data);
  return response.data;
};

export const logoutApi = async () => {
  const { data } = await axios.post(`${baseURL}/v1/auth/logout`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
  });
  return data;
};

export const checkAuth = async (): Promise<ResponseMyinfoDto> => {
  const { data } = await axios.get(`${baseURL}/v1/auth/protected`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
  });
  return data;
};

export const getMyInfo = async (): Promise<ApiResponse<UserInfo>> => {
  const response = await axios.get<ApiResponse<UserInfo>>('/v1/auth/me');
  return response.data;
};

export interface SignupRequest {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  password: string;
}

export const refreshToken = async (refresh: string): Promise<ApiResponse<LoginResponse>> => {
  const response = await axiosInstance.post<ApiResponse<LoginResponse>>('/v1/auth/refresh', { refresh });
  return response.data;
};

export const signupApi = async (data: SignupRequest) => {
  return axiosInstance.post("/v1/auth/signup", data);
};

export const getGoogleLoginUrl = (): string => {
  return `${baseURL}/v1/auth/google/login`;
};

/**
 * 구글 로그인 콜백
 * @param code
 * @returns
 */

export const handleGoogleCallback = async (code: string) => {
  const { data } = await axios.get('${apiurl}/v1/auth/google/callback?code=${code}', {
    withCredentials: true
  });
  return data;
};

export const signOut = async (): Promise<ApiResponse<null>> => {
  const response = await axios.post<ApiResponse<null>>('/v1/auth/signout');
  return response.data;
};


export const updateProfile = async (formData: FormData) => {
  const { data } = await axios.patch(`${baseURL}/v1/users/me`, formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
  });
  return data;
};

