import axios from "axios";

export const axiosInstance = axios.create({
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
	},
	baseURL: import.meta.env.VITE_BASE_URL,
});
