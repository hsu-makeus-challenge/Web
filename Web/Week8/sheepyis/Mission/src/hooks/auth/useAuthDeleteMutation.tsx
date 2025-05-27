import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

const deleteUser = async () => {
    const response = await AuthAPI.delete("/users");
    return response.data;
};

export const useAuthDeleteMutation = (onSuccess: () => void, onError?: (err: unknown) => void) => {
    return useMutation({
        mutationFn: deleteUser,
        onSuccess,
        onError: onError ?? ((err) => console.error("탈퇴 실패:", err)),
    });
};
