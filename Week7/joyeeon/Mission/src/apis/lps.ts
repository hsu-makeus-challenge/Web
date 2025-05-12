import { api } from "./api";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { CreateLpData } from "../types/createLp";
import type { LpUpdateDetail } from "../types/lpdetails";

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

export const fetchLpDetail = (id: string) => {
    return api.get(`/lps/${id}`).then(res => res.data.data);
};

export const createcomment =(content:string, lpid : number) =>{
    const token = localStorage.getItem('ACCESS_TOKEN');

    return api.post(`/lps/${lpid}/comments`, {content}, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
}

//댓글 수정 삭제
export const updatecomment = (content:string, lpid : number, commentid : number) =>{
    const token = localStorage.getItem('ACCESS_TOKEN');

    return api.patch(`/lps/${lpid}/comments/${commentid}`, {content}, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
}

export const deletecomment = (lpid : number, commentid : number) =>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    return api.delete(`/lps/${lpid}/comments/${commentid}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    }); 
}

export const createLp = (lpData: CreateLpData) => {
    const token = localStorage.getItem('ACCESS_TOKEN');

    return api.post('/lps', lpData, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
};


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

//lp 상세 수정
export const updateLpDetail = (lpId: number, lpData: LpUpdateDetail) => { 
    const token = localStorage.getItem('ACCESS_TOKEN');

    return api.patch(`/lps/${lpId}`, lpData, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
}


// LP 삭제
export const deleteLp = (lpId: number) => {
    const token = localStorage.getItem('ACCESS_TOKEN');

    return api.delete(`/lps/${lpId}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
};

