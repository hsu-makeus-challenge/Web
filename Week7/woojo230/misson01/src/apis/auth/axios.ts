import axios from 'axios';
import useLoginStore from '../../stores/login';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
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

instance.interceptors.request.use(
  // skipAuth 헤더가 있는 경우 토큰을 추가하지 않음
  (config) => {
    if (config.headers?.skipAuth) {
      delete config.headers.skipAuth;
      return config;
    }

    // skipAuth 헤더가 없는 경우 토큰을 추가
    const token = useLoginStore.getState().accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = useLoginStore.getState().refreshToken;

        if (!refreshToken) {
          isRefreshing = false;
          useLoginStore.getState().clearTokens();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/v1/auth/refresh`,
            {
              refreshToken,
            }
          );

          const newAccessToken = data.accessToken;
          useLoginStore.getState().setTokens(newAccessToken, refreshToken);

          onTokenRefreshed(newAccessToken);
          isRefreshing = false;

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          useLoginStore.getState().clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
