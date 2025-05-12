import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      console.log('요청에 토큰 추가됨:', accessToken.substring(0, 10) + '...');
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('응답 성공:', response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 토큰 재발급 요청 자체가 실패한 경우는 인터셉터에서 제외
    if (originalRequest.url === '/v1/auth/refresh') {
      console.error('토큰 재발급 실패');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // 401 에러이고, 이미 재시도한 요청이 아닌 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('토큰 만료됨, 재발급 시도...');
      originalRequest._retry = true;

      try {
        // 토큰 재발급 시도
        const response = await refreshToken();
        if (response.status) {
          console.log('토큰 재발급 성공');
          // 새로운 토큰 저장
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);

          // 실패한 요청의 Authorization 헤더 업데이트
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          
          console.log('실패한 요청 재시도:', originalRequest.url);
          // 실패한 요청 재시도
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        // 토큰 재발급 실패 시 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log('로그아웃 처리됨');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    console.error('❌ API 요청 실패:', error.response?.status, error.config.url);
    return Promise.reject(error);
  }
);

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
  message: string;
  statusCode: number;
  data: {
    id: number;
    name: string;
    accessToken: string; 
    refreshToken: string; 
  }
}

//로그인 요청 함수
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/v1/auth/signin', data);
  return response.data;
};

//사용자 정보 응답
export interface UserInfoResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  }
}

//사용자 정보 요청 함수
export const getUserInfo = async (): Promise<UserInfoResponse> => {
  const response = await axiosInstance.get('/v1/users/me');
  return response.data;
};

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

// 토큰 재발급 요청 함수
export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }

  // axiosInstance 대신 일반 axios를 사용하여 인터셉터 우회
  const response = await axios.post(`${API_BASE_URL}/v1/auth/refresh`, {
    refresh: refreshToken
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};
