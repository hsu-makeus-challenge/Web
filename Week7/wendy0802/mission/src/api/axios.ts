import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";
import { RequestRefreshDto, ResponseRefreshDto } from "../types/auth";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const baseURL = import.meta.env.VITE_SERVER_API_URL;

const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  console.log("[axios] accessToken 조회:", token ? "토큰 있음" : "토큰 없음");
  return token;
};

const getRefreshToken = () => localStorage.getItem("refreshToken");

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  console.log("[axios] 토큰 저장 완료");
};

const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  console.log("[axios] 토큰 제거 완료");
};

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    console.log("[axios] 토큰 갱신 시도");
    const response = await axios.post<ResponseRefreshDto>(
      `${baseURL}/v1/auth/refresh`,
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

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("[axios] 401 오류 - 토큰 갱신 시도");
      originalRequest._retry = true;
      const isRefreshed = await refreshAccessToken();
      if (isRefreshed) {
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