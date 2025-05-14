import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

export const useAuthLogoutMutation = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: async () => {
            await AuthAPI.post("/auth/signout");
        },
        onSuccess: () => {
            localStorage.clear();
            onSuccess();
        },
        onError: (err) => {
            console.error("로그아웃 실패:", err);
            alert("로그아웃 중 오류가 발생했습니다.");
        },
    });
};
