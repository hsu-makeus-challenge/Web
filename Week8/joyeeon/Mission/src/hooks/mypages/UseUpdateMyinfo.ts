import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateInfoPayload } from "../../types/mypage";
import { updateInfo } from "../../apis/users";
import { useMypageStore } from "../../stores/MypageStore"

export const useUpdateMyinfo = () =>{
    const queryClient = useQueryClient();
    const setUserInfo = useMypageStore(state => state.setUserInfo);
    const userInfo = useMypageStore(state => state.userInfo);
    return useMutation({
        mutationFn: (updateData: UpdateInfoPayload) => updateInfo(updateData),

        onMutate: async (newData) =>{
            if (!userInfo) return;

            await queryClient.cancelQueries({ queryKey: ["myinfo"] });

            const previousUserInfo = userInfo;

            setUserInfo({
                ...userInfo,
                data: {
                    ...userInfo.data,
                    ...newData, // 닉네임 등 수정된 값 반영
                },
            });

            return { previousUserInfo };
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["myinfo"] });
        },
        onSuccess: (response) => {
            console.log("내 정보 수정 성공:", response.data);
        },
        onError: (error) => {
            console.error("내 정보 수정 실패:", error);
        },
    });
}