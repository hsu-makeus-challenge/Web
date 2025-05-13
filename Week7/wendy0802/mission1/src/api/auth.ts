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

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

// LoginRequest 타입 정의
export type LoginRequest = RequestSigninDto;

// 회원가입
export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
  const { data } = await axios.post(`${baseURL}/v1/auth/signup`, body, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
  return data;
};

// 로그인
export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
  const { data } = await axios.post(`${baseURL}/v1/auth/signin`, body, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
  return data;
};

export const loginApi = async (data: LoginRequest): Promise<ResponseSigninDto> => {
  return postSignin(data);
};

// 토큰 인증 테스트
export const checkAuth = async (): Promise<ResponseMyinfoDto> => {
  const { data } = await axios.get(`${baseURL}/v1/auth/protected`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
  });
  return data;
};

// 내 정보 조회
export const getMyInfo = async (): Promise<ResponseMyinfoDto> => {
  const { data } = await axios.get(`${baseURL}/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
  });
  return data;
};

// 토큰 재발급
export const refreshToken = async (refreshToken: string): Promise<ResponseRefreshDto> => {
  const { data } = await axios.post(`${baseURL}/v1/auth/refresh`, 
    { refreshToken } as RequestRefreshDto,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }
  );
  return data;
};

// Google 로그인 URL 가져오기
export const getGoogleLoginUrl = (): string => {
  return `${baseURL}/v1/auth/google/login`;
};

// Google 로그인 콜백 처리
export const handleGoogleCallback = async () => {
  try {
    // 리다이렉트된 현재 URL에서 토큰 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    if (accessToken && refreshToken) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return { accessToken, refreshToken };
    } else {
      throw new Error('토큰이 없습니다.');
    }
  } catch (error) {
    console.error('Google 로그인 콜백 처리 실패:', error);
    throw error;
  }
};

// 로그아웃
export const signOut = async (): Promise<ResponseLogoutDto> => {
  const { data } = await axios.post(`${baseURL}/v1/auth/signout`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
  });
  return data;
};

// 프로필 업데이트
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

export const logoutApi = async () => {
  const { data } = await axios.post(`${baseURL}/v1/auth/logout`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
  });
  return data;
};

