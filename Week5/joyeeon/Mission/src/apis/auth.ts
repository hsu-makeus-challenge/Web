import axios from "axios";

const BASE_URL = "http://localhost:8000/v1/auth";

//로그인
export const loginApi = async (email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/signin`, {
        email,
        password,
    });
    return response.data; // 호출한 쪽에서는 .accessToken, .refreshToken 꺼내쓰면 돼
};

// 회원가입 API
export const signupApi = async (userData: {
    email: string;
    password: string;
    name: string;
    bio?: string;
    avatar?: string;
}) => {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
};