import { api } from "../apis/api";
import { useInfiniteQuery } from "@tanstack/react-query";
const getAccessToken = () => localStorage.getItem("ACCESS_TOKEN");

export interface LpComment {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: {
        id: number;
        name: string;
        email: string;
        bio: string | null;
        avatar: string | null;
        createdAt: string;
        updatedAt: string;
    };
}

interface UseLpCommentsParams {
    lpId: number;
    limit?: number;
    order?: "asc" | "desc";
}

type LpCommentPage = {
    items: LpComment[];
    nextCursor?: number;
};
export const useLpComments = ({
    lpId,
    limit = 10,
    order = "desc",
}: UseLpCommentsParams) => {
    return useInfiniteQuery<LpCommentPage, Error>({
        queryKey: ["lpComments", lpId, limit, order],
        queryFn: async ({ pageParam = 0 }) => {
            const token = getAccessToken();

            const response = await api.get(`/lps/${lpId}/comments`, {
                params: { cursor: pageParam, limit, order },
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                  },
            });

            const commentList = response.data.data.data;
            const nextCursor = response.data.data.nextCursor;

            // UX 확인용 지연
            //await new Promise((resolve) => setTimeout(resolve, 700));
            console.log("댓글리스트", commentList);

            return {
                items: commentList,
                nextCursor,
            };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });
};