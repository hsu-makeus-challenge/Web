import { api } from "./api";
import { useInfiniteQuery } from "@tanstack/react-query";


export interface LP {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: { id: number; name: string }[];
    likes: { id: number; userId: number; lpId: number }[];
}

interface UseLpListParams {
    limit?: number;
    search?: string;
    order?: "asc" | "desc";
}


export const useLpList = ({
    limit = 10,
    search = "",
    order = "desc",
}: UseLpListParams) => {
    return useInfiniteQuery({
        queryKey: ["lpList", limit, search, order],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await api.get(`/lps`, {
                params: {
                    cursor: pageParam,
                    limit,
                    search,
                    order,
                },
            });

            const lpList = response.data.data.data;
            const nextCursor = response.data.data.nextCursor;

            console.log("불러온 LP 목록:", lpList);

            //스켈레톤 확인 용 딜레이 
            await new Promise((resolve) => setTimeout(resolve, 500));
            return {
                items: lpList,
                nextCursor,
            };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor ?? undefined; 
        },
    });
};