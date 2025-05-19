import { createcomment, updatecomment , deletecomment} from "../apis/lps";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateCommentPayload {
    content: string;
    lpid: number;
}

interface UpdateCommentPayload {
    content: string;
    lpid: number;
    commentid: number;  
}

export const useCreateLpComment = () => {

    return useMutation({
        mutationFn: ({ content, lpid }: CreateCommentPayload) => createcomment(content, lpid),
        onSuccess: (response) => {
            console.log("LP 댓글 생성 성공:", response.data);
        },
        onError: (error) => {
            console.error("LP 댓글 생성 실패:", error);
        },
    });
};


export const useUpdateLpComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ content, lpid, commentid }: UpdateCommentPayload) => updatecomment(content, lpid, commentid),
        onSuccess: (response, {lpid}) => {
            queryClient.invalidateQueries({ queryKey: ["lpComments", lpid] });

            console.log("LP 댓글 수정 성공:", response.data);
        },
        onError: (error) => {
            console.error("LP 댓글 수정 실패:", error);
        },
    });
}

export const useDeleteLpComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ lpid, commentid }: { lpid: number; commentid: number }) => deletecomment(lpid, commentid),
        onSuccess: (response, {lpid}) => {
            queryClient.invalidateQueries({ queryKey: ["lpComments", lpid] });

            console.log("LP 댓글 삭제 성공:", response.data);
        },
        onError: (error) => {
            console.error("LP 댓글 삭제 실패:", error);
        },
    });
};