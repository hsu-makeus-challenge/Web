import { addLike, removeLike } from "../apis/likes";
import { useMutation , useQueryClient} from "@tanstack/react-query";

// 좋아요 추가
export const useAddLike = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (lpid: number) => addLike(lpid),
        onSuccess: (response, lpId) => {
            queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
            console.log("좋아요 추가 성공:", response.data);
        },
        onError: (error) => {
            console.error("좋아요 추가 실패:", error);
        },
    });
}

// 좋아요 삭제
export const useRemoveLike = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (lpid: number) => removeLike(lpid),
        onSuccess: (response, lpId) => {
            queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
            console.log("좋아요 삭제 성공:", response.data);
        },
        onError: (error) => {
            console.error("좋아요 삭제 실패:", error);
        },
    });
}
