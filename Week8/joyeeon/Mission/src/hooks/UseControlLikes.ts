import { addLike, removeLike } from "../apis/likes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ToggleLikeParams {
    lpId: number;
    userId: number;
    isCurrentlyLiked: boolean;
}


// 좋아요 추가
// export const useAddLike = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (lpid: number) => addLike(lpid),
//         onSuccess: (response, lpId) => {
//             queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
//             console.log("좋아요 추가 성공:", response.data);
//         },
//         onError: (error) => {
//             console.error("좋아요 추가 실패:", error);
//         },
//     });
// }

// // 좋아요 삭제
// export const useRemoveLike = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (lpid: number) => removeLike(lpid),
//         onSuccess: (response, lpId) => {
//             queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
//             console.log("좋아요 삭제 성공:", response.data);
//         },
//         onError: (error) => {
//             console.error("좋아요 삭제 실패:", error);
//         },
//     });
// }


export const useToggleLike = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ lpId, userId, isCurrentlyLiked }: ToggleLikeParams) => {
            return isCurrentlyLiked ? removeLike(lpId) : addLike(lpId);
        },
        onMutate: async ({ lpId, userId, isCurrentlyLiked }) => {
            await queryClient.cancelQueries({ queryKey: ["lpDetail", lpId] });

            const previousData = queryClient.getQueryData(["lpDetail", lpId]);

            queryClient.setQueryData(["lpDetail", lpId], (old: any) => {
                if (!old) return old;

                const newLikes = isCurrentlyLiked
                    ? old.likes.filter((userId: number) => userId !== old.currentUserId)
                    : [...old.likes, old.currentUserId];

                return {
                    ...old,
                    likes: newLikes,
                };
            });

            return { previousData };
        },

        onSettled: (_data, _error, { lpId }) => {
            queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
        },
        onError: (_err, { lpId }, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(["lpDetail", lpId], context.previousData);
            }
        },

    });
}