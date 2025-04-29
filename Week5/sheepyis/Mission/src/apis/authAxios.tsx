import axios from "axios";

const baseURL = import.meta.env.VITE_API_BACKEND_URL;

export const AuthAPI = axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
  },
});

AuthAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AuthAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await AuthAPI.post("auth/refresh", { refresh: refreshToken });
        const newAccessToken = data.data.accessToken;
        
        localStorage.setItem('accessToken', newAccessToken);
        AuthAPI.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        return AuthAPI(originalRequest);
      } catch (refreshError) {
        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
