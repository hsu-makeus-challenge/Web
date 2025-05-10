import { axiosInstance } from "./axios"; 
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

let refreshPromise: Promise<string> | null = null;

export const refreshToken = async () => {
  const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const refreshToken = getRefreshToken();

  const { data } = await axiosInstance.post("/v1/auth/refresh", { refresh: refreshToken });

  const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  setAccessToken(data.data.accessToken);

  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  setRefreshToken(data.data.refreshToken);

  return data.data.accessToken;
};

export const getRefreshPromise = () => {
  if (!refreshPromise) {
    refreshPromise = refreshToken()
      .catch(() => {
        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        removeAccessToken();
        const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        removeRefreshToken();
        window.location.href = "/login";
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};