import axios from "axios";
import { LOCAL_STORAGE_KEY } from "@constants/key";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

		if (token) {
			try {
				const parsedToken = JSON.parse(token);
				config.headers.Authorization = `Bearer ${parsedToken}`;
			} catch (error) {
				console.log("🚀 ~ error:", error);
				config.headers.Authorization = `Bearer ${token}`;
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
