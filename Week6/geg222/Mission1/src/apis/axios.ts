import axios, {InternalAxiosRequestConfig} from "axios";
import {LOCAL_STORAGE_KEY} from "../constants/key";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {getRefreshPromise} from "./refreshTokenManager"; // refresh 관리 별도

// 요청 인터셉터에 사용할 accessToken 설정 함수
const attachAccessToken = (config: InternalAxiosRequestConfig) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
};

// 401 에러를 처리하는 함수
const handleResponseError = async (error: any) => {
    const originalRequest = error.config;

    if (
        error.response?.status === 401 &&
        !originalRequest._retry
    ) {
        ㅇ
        if (originalRequest.url === "/v1/auth/refresh") {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            removeAccessToken();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            removeRefreshToken();
            window.location.href = "/login";
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const newAccessToken = await getRefreshPromise();
        if (newAccessToken) {
            originalRequest.headers = {
                ...(originalRequest.headers || {}),
                Authorization: `Bearer ${newAccessToken}`,
            };
            return axiosInstance.request(originalRequest);
        }
    }

    return Promise.reject(error);
};

// axios 인스턴스 생성
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 인터셉터 등록
axiosInstance.interceptors.request.use(attachAccessToken, (error) => Promise.reject(error));
axiosInstance.interceptors.response.use((response) => response, handleResponseError);
