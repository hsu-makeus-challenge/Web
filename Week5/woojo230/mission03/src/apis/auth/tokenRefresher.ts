import axiosInstance from './axios';
import {
  useLocalStorage,
  useSessionStorage,
} from '../../hooks/useLocalStorage';

const { set: setLocal, get: getLocal } = useLocalStorage();
const { get: getSession, remove: removeSession } = useSessionStorage();

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = (navigate: (url: string) => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                resolve(axiosInstance(originalRequest));
              },
              reject: (err: any) => {
                reject(err);
              },
            });
          });
        }
        isRefreshing = true;
        const refreshToken = getSession('refreshToken');
        if (!refreshToken) {
          isRefreshing = false;
          removeSession('refreshToken');
          setLocal('accessToken', '');
          navigate('/login');
          return Promise.reject(error);
        }
        try {
          const response = await axiosInstance.post('/v1/auth/refresh', {
            refreshToken,
          });
          const newAccessToken = response.data.data.accessToken;
          setLocal('accessToken', newAccessToken);
          processQueue(null, newAccessToken);
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          processQueue(err, null);
          removeSession('refreshToken');
          setLocal('accessToken', '');
          navigate('/login');
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    }
  );
};
