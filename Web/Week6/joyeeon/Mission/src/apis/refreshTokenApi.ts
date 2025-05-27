import { api } from "./api";

export const refreshTokenApi = async (refreshToken: string) => {
    const response = await api.post('/auth/refresh', 
        { refresh: refreshToken });
    console.log("토큰 재발급",response.data);
    return response.data;  // { accessToken: "새로운토큰" }
    
};