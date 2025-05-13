export interface ApiResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email?: string;
}

export interface RefreshTokenResponse {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
} 