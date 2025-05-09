import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../api/lp";

interface UseInfiniteCommentsParams {
  lpId: string | number;
  order?: "desc" | "asc";
  limit?: number;
}

export default function useGetInfiniteComments({ lpId, order = "desc", limit = 10 }: UseInfiniteCommentsParams) {
  return useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam = 0 }) => getComments(lpId, { cursor: pageParam, order, limit }),
    getNextPageParam: (lastPage: any) => lastPage?.data?.nextCursor ?? undefined,
    initialPageParam: 0,
  });
} 