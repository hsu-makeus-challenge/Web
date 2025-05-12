import axios from "axios";
import { LOCAL_STORAGE_KEY } from "@constants/key";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
	},
});

export const authInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
	},
});
