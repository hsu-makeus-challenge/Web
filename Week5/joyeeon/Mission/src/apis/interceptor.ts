import { api } from "./api";
import { refreshTokenApi } from "./refreshTokenApi";
import { AxiosError, AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: AxiosError) => void;
}[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};


export const setupInterceptors = () => {
    api.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as CustomAxiosRequestConfig;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                if (isRefreshing) {
                    return new Promise<string>((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token: string) => {
                            if (originalRequest.headers) {
                                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            }
                            return api(originalRequest);
                        })
                        .catch(err => Promise.reject(err));
                }

                isRefreshing = true;

                try {
                    const refreshToken = localStorage.getItem('REFRESH_TOKEN');
                    if (!refreshToken) throw new Error('No refresh token found');

                    console.log('[interceptor] accessToken 만료 감지, 새 토큰 요청 시작...');

                    const data = await refreshTokenApi(refreshToken);
                    const newAccessToken = data.data.accessToken;

                    console.log('새 AccessToken 발급 완료:', newAccessToken);


                    // 새 accessToken 저장
                    localStorage.setItem('ACCESS_TOKEN', newAccessToken);

                    // 기본 헤더 업데이트
                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                    processQueue(null, newAccessToken);

                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }

                    return api(originalRequest);
                } catch (err) {
                    console.error(' 리프레시 토큰으로 새 AccessToken 발급 실패:', err);
                    processQueue(err as AxiosError, null);
                    // 토큰 재발급 실패 -> 로그아웃 처리
                    localStorage.removeItem('ACCESS_TOKEN');
                    localStorage.removeItem('REFRESH_TOKEN');
                    window.location.href = '/login';  // 로그인 페이지로 이동
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
};