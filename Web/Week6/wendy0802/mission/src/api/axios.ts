// src/api/axios.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";
import { RequestRefreshDto, ResponseRefreshDto } from "../types/auth";

// 커스텀 요청 설정 타입
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// accessToken을 localStorage에서 가져오는 함수
const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  console.log("[axios] accessToken 조회:", token ? "토큰 있음" : "토큰 없음");
  return token;
};

const getRefreshToken = () => localStorage.getItem("refreshToken");

// 토큰 저장 함수
const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  console.log("[axios] 토큰 저장 완료");
};

// 토큰 제거 함수
const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  console.log("[axios] 토큰 제거 완료");
};

// 토큰 갱신 요청 함수
const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    console.log("[axios] 토큰 갱신 시도");
    const response = await axios.post<ResponseRefreshDto>(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      { refreshToken } as RequestRefreshDto
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    setTokens(accessToken, newRefreshToken);
    console.log("[axios] 토큰 갱신 성공");
    return true;
  } catch (error) {
    console.error("[axios] 토큰 갱신 실패:", error);
    removeTokens();
    return false;
  }
};

// API 기본 URL이 이미 '/v1'을 포함하도록 설정
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/v1`,
  withCredentials: true,
});

// 요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    console.log("[axios] 요청 URL:", config.url);
    
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("[axios] 인증 헤더 추가됨");
    } else {
      console.log("[axios] 인증 헤더 추가 안됨 (토큰 없음)");
    }
    return config;
  },
  (error) => {
    console.error("[axios] 요청 인터셉터 오류:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 토큰 만료 시 자동 갱신
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("[axios] 응답 성공:", response.config.url);
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (!originalRequest) return Promise.reject(error);

    console.error("[axios] 응답 오류:", {
      url: originalRequest.url,
      status: error.response?.status
    });

    // 토큰 만료 에러 (401)이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("[axios] 401 오류 - 토큰 갱신 시도");
      originalRequest._retry = true;

      // 토큰 갱신 시도
      const isRefreshed = await refreshAccessToken();
      if (isRefreshed) {
        // 갱신된 토큰으로 원래 요청 재시도
        console.log("[axios] 토큰 갱신 후 요청 재시도");
        const accessToken = getAccessToken();
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);