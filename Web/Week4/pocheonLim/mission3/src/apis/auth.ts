import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

//회원가입 요청
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
}

//회원가입 응답
export interface SignupResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

//회원가입 요청 함수
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await axios.post(`${API_BASE_URL}/v1/auth/signup`, data);
  return response.data;
};

//로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

//로그인 응답
export interface LoginResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    accessToken: string; 
    refreshToken: string; 
  }
}

//로그인 요청 함수
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${API_BASE_URL}/v1/auth/signin`, data);
  return response.data;
};
