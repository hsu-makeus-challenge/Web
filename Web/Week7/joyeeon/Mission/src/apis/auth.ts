import {api} from './api';
const BASE_URL = "/auth";

//로그인
export const loginApi = async (email: string, password: string) => {
    const response = await api.post(`${BASE_URL}/signin`, {
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
    const response = await api.post(`${BASE_URL}/signup`, userData);
    return response.data;
};


// 로그아웃 API
export const logoutApi = async () => {
    const response = await api.post(`${BASE_URL}/signout`);
    return response.data;
};

// 회원탈퇴
export const WithdrawApi = async() =>{
    return api.delete (`users`, {
        
    });
}