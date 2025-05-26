import axios, { AxiosInstance,  AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

async function getNewAccessToken(): Promise<string> {
    
        const response: AxiosResponse<{ accessToken: string }> = await api.post(
            '/auth/refresh',
            {},
            { withCredentials: true }
        );
        return response.data.accessToken;
}

export { api, getNewAccessToken };
