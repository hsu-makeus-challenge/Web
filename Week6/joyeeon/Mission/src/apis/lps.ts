import { api } from "./api";
import { useQuery } from "@tanstack/react-query";


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
    cursor?: number;
    limit?: number;
    search?: string;
    order?: "asc" | "desc";
}


export const useLpList = ({
    cursor = 0,
    limit = 10,
    search = "",
    order = "desc",
}: UseLpListParams) =>{
    return useQuery({
        queryKey: ["lpList", cursor, limit, search, order],
        queryFn: async() =>{
            const response = await api.get(`/lps`, {
                params: { cursor, limit, search, order },
            });
            console.log("lp 데이터 호출", response.data.data.data);
            return response.data.data.data;
        }
    })
}