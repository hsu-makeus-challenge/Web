import { useMutation } from "@tanstack/react-query";
import type { UpdateInfoPayload } from "../../types/mypage";
import { updateInfo } from "../../apis/users";

export const useUpdateMyinfo = () =>{
    return useMutation({
        mutationFn: (updateData: UpdateInfoPayload) => updateInfo(updateData),
        onSuccess: (response) => {
            console.log("내 정보 수정 성공:", response.data);
        },
        onError: (error) => {
            console.error("내 정보 수정 실패:", error);
        },
    });
}