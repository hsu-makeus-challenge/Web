
// src/api/auth.ts
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
baseURL: "http://localhost:8000",
withCredentials: true,
});

// 토큰 관리 함수
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const setAccessToken = (token: string) => localStorage.setItem("accessToken", token);
const setRefreshToken = (token: string) => localStorage.setItem("refreshToken", token);

// (무한 재시도 방지)
let isRefreshing = false;
// 토큰 갱신 중 대기중인 요청들을 저장
let failedQueue: any[] = [];

// 대기중인 요청 처리 함수
const processQueue = (error: any, token = null) => {
failedQueue.forEach(prom => {
if (error) {
prom.reject(error);
} else {
prom.resolve(token);
}
});

failedQueue = [];
};

// 요청 인터셉터 설정
api.interceptors.request.use(
(config) => {
const token = getAccessToken();
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
},
(error) => Promise.reject(error)
);

// 응답 인터셉터 설정
api.interceptors.response.use(
(response) => response,
async (error) => {
const originalRequest = error.config;

// 토큰 만료 에러 처리 (일반적으로 401 상태 코드)
if (error.response?.status === 401 && !originalRequest._retry) {
// 무한 재시도 방지를 위한 플래그
originalRequest._retry = true;

if (isRefreshing) {
// 이미 토큰 갱신 중이라면 대기열에 추가
return new Promise((resolve, reject) => {
failedQueue.push({ resolve, reject });
})
.then(token => {
originalRequest.headers.Authorization = `Bearer ${token}`;
return api(originalRequest);
})
.catch(err => Promise.reject(err));
}

isRefreshing = true;

try {

const refreshToken = getRefreshToken();
if (!refreshToken) {
throw new Error("Refresh token not available");
}

const response = await api.post("/v1/auth/refresh", { refreshToken });

// 새 토큰 저장
const { accessToken, refreshToken: newRefreshToken } = response.data;
setAccessToken(accessToken);
if (newRefreshToken) {
setRefreshToken(newRefreshToken);
}

// 헤더 업데이트 및 대기 중인 요청 처리
originalRequest.headers.Authorization = `Bearer ${accessToken}`;
processQueue(null, accessToken);

// 실패했던 원래 요청 재시도
return api(originalRequest);
} catch (err) {
processQueue(err, null);
// 갱신 실패 시 로그인 페이지로 리다이렉트 처리
window.location.href = "/login";
return Promise.reject(err);
} finally {
isRefreshing = false;
}
}

return Promise.reject(error);
}
);

export interface SignupRequest {
name: string;
email: string;
bio: string;
avatar: string;
password: string;
}

export interface LoginRequest {
email: string;
password: string;
}

export const signupApi = async (data: SignupRequest) => {
return api.post("/v1/auth/signup", data);
};

export const loginApi = async (data: LoginRequest) => {
const response = await api.post("/v1/auth/signin", data);

// 로그인 성공 시 토큰 저장
if (response.data.accessToken) {
setAccessToken(response.data.accessToken);
}
if (response.data.refreshToken) {
setRefreshToken(response.data.refreshToken);
}

return response;
};

// 로그아웃 함수 추가
export const logoutApi = () => {
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
};

// 토큰 갱신 API
export const refreshTokenApi = async () => {
const refreshToken = getRefreshToken();
if (!refreshToken) {
throw new Error("Refresh token not available");
}

return api.post("/v1/auth/refresh", { refreshToken });
};

// API 인스턴스 내보내기