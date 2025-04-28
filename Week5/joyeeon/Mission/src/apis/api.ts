import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = "http://localhost:8000/v1";

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

async function getNewAccessToken(): Promise<string> {
    try {
        const response: AxiosResponse<{ accessToken: string }> = await api.post(
            '/auth/refresh',
            {},
            { withCredentials: true }
        );
        return response.data.accessToken;
    } catch (error) {
        throw error;
    }
}

export { api, getNewAccessToken };
