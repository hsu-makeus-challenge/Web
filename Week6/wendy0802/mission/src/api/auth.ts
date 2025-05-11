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

// LoginRequest 타입 정의
export type LoginRequest = RequestSigninDto;

export const postSignup = async (
  body: RequestSignupDto,
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post('v1/auth/signup', body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto,
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post('v1/auth/signin', body);
  return data;
};

export const loginApi = async (data: LoginRequest): Promise<ResponseSigninDto> => {
  return postSignin(data);
};

export const logoutApi = async (): Promise<ResponseLogoutDto> => {
  const { data } = await axiosInstance.post('v1/auth/logout');
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyinfoDto> => {
  const { data } = await axiosInstance.get('v1/auth/protected');
  return data;
};

export const postLogout = async (): Promise<ResponseLogoutDto> => {
  const { data } = await axiosInstance.post('v1/auth/logout');
  return data;
};

const BASE_URL = 'http://localhost:3000/v1';

interface SignUpRequest {
  email: string;
  password: string;
}

export const postLogin = async (data: LoginRequest) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  return response.data;
};

export const postSignUp = async (data: SignUpRequest) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, data);
  return response.data;
};

