import axios, { InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

export const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  },
});

axiosInstance.interceptors.request.use((config) => {
  return config;
}, (error) => Promise.reject(error), 
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (
      error.response && 
      error.response.status === 401 &&
      !originalRequest._retry
    ) {


      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: "refreshToken",
          });

          return data.data.accessToken;
        })().catch(() => {

          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      });
    }
    return Promise.reject(error);
  },
)