// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답
export interface LoginResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
  }
}

// 회원가입 요청
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
}

// 회원가입 응답
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

// 토큰 재발급 응답
export interface RefreshTokenResponse {
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