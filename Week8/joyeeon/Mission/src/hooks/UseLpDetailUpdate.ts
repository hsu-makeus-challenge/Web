import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LpUpdateDetail } from "../types/lpdetails";
import { updateLpDetail } from "../apis/lps";
import { AxiosError } from "axios";

export const useUpdateLpDetail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ lpId, lpData }: { lpId: number; lpData: LpUpdateDetail }) =>
            updateLpDetail(lpId, lpData),
        onSuccess: (res, variables) => {
            console.log("수정 성공:", res.data);
            // 예: 해당 LP의 상세 캐시를 무효화하거나 다시 가져오기
            queryClient.invalidateQueries({
                queryKey: ["lpDetail", String(variables.lpId)],
            });
            //queryClient.invalidateQueries({ queryKey: ["lpDetail", res.data.data.id] });
        },
        onError: (error: AxiosError) => {
            console.error("수정 실패:", error.response?.data || error.message);
        },
    });
}