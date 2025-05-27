import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BACKEND_URL;

export const AuthAPI = axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
  },
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

// 요청 인터셉터: skipAuth 없으면 토큰 자동 추가
AuthAPI.interceptors.request.use(
  (config) => {
    if (config.headers?.skipAuth) {
      delete config.headers.skipAuth;
      return config;
    }

    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: accessToken 만료 시 refresh 로직 수행
AuthAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem('refreshToken');

        try {
          const { data } = await axios.post(
            `${baseURL}/auth/refresh`,
            { refresh: refreshToken, }
          );

          const newAccessToken = data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          onTokenRefreshed(newAccessToken);

          isRefreshing = false;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return AuthAPI(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(AuthAPI(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);
