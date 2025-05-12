import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../apis/api";
import { loginApi, logoutApi , WithdrawApi} from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface LoginPayload {
    email: string;
    password: string;
}

export const useLogin = () => {
    const navigate = useNavigate();
    const { login, accessToken } = useAuth();


    const mutation = useMutation({
        mutationFn: ({ email, password }: LoginPayload) => loginApi(email, password),
        onSuccess: (response) => {

            const { accessToken, refreshToken, name, id } = response.data;

            console.log("[useLogin] accessToken:", accessToken); // 디버깅용
            login(accessToken, refreshToken, name, id);
            api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        },
        onError: (error) => {
            console.error("로그인 실패", error);
        },
    });

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);


    return mutation;
}

//로그아웃
export const useLogout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: () => logoutApi(),
        onSuccess: () => {
            logout();
            navigate("/");
            console.log("로그아웃 성공");
        },
        onError: (error) => {
            console.error("로그아웃 실패", error);
        },
    });

    return mutation;
}

//회원탈퇴

export const useWithdraw = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: WithdrawApi,
        onSuccess: () => {
            alert("회원 탈퇴가 완료되었습니다.");
            localStorage.removeItem("accessToken");
            navigate("/login");
        },
        onError: () => {
            alert("탈퇴 중 문제가 발생했습니다.");
        }
    });
};