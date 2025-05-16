import axios, {
	type AxiosError,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";
import { LOCAL_STORAGE_KEY } from "@constants/key";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

let refreshTokenPromise: Promise<string | null> | null = null;

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

		if (accessToken) {
			try {
				const parsedToken = JSON.parse(accessToken);
				config.headers.Authorization = `Bearer ${parsedToken}`;
			} catch (error) {
				console.log("🚀 ~ error:", error);
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// 토큰 갱신 함수
const refreshAccessToken = async (): Promise<string | null> => {
	try {
		const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
		if (!refreshToken) return null;

		let parsedRefreshToken: string;
		try {
			parsedRefreshToken = JSON.parse(refreshToken);
		} catch (error) {
			console.log("🚀 ~ refreshAccessToken ~ error:", error);
			parsedRefreshToken = refreshToken;
		}

		const response = await axios.post(
			`${import.meta.env.VITE_BASE_URL}auth/refresh`,
			{ refresh: parsedRefreshToken },
		);

		const { accessToken, refreshToken: newRefreshToken } = response.data.data;

		localStorage.setItem(
			LOCAL_STORAGE_KEY.accessToken,
			JSON.stringify(accessToken),
		);
		localStorage.setItem(
			LOCAL_STORAGE_KEY.refreshToken,
			JSON.stringify(newRefreshToken),
		);

		return accessToken;
	} catch (error) {
		console.log("🚀 ~ refreshAccessToken ~ error:", error);
		// 토큰 갱신 실패 시 로그아웃 처리
		localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
		localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
		return null;
	}
};

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		// AccessToken 만료 오류(401)이고 재시도되지 않은 요청인 경우
		if (error.response?.status === 401 && !originalRequest._retry) {
			// 이미 진행 중인 토큰 갱신 요청이 있으면 재사용
			if (originalRequest.url?.includes("auth/refresh")) {
				localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
				localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
				window.location.href = "/login";
				return Promise.reject(error);
			}

			originalRequest._retry = true;
			try {
				// 이미 진행 중인 토큰 갱신 요청이 있으면 재사용
				if (!refreshTokenPromise) {
					refreshTokenPromise = refreshAccessToken();
				}
				const newAccessToken = await refreshTokenPromise;
				refreshTokenPromise = null;

				// 토큰 갱신 실패 시
				if (!newAccessToken) {
					window.location.href = "/login";
					return Promise.reject(error);
				}

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

				return axiosInstance(originalRequest);
			} catch (refreshError) {
				refreshTokenPromise = null;
				localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
				localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);
