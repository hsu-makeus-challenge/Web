import { useInfiniteQuery } from "@tanstack/react-query";
import { getLPList } from "../../api/lp";
import { QUERY_KEY } from "../../constants/key";
import { LPListResponse } from "../../types/lp";

interface UseInfiniteLpListParams {
  order?: "desc" | "asc";
  limit?: number;
  search?: string;
}

export default function useInfiniteSearchLpList({ order = "desc", limit = 20, search = "" }: UseInfiniteLpListParams = {}) {
  return useInfiniteQuery<LPListResponse>({
    queryKey: [QUERY_KEY.LP_LIST, order, search], // search가 바뀌면 쿼리 리셋
    queryFn: async ({ pageParam = 0 }) => {
      return getLPList({
        order,
        limit,
        cursor: typeof pageParam === 'number' ? pageParam : Number(pageParam),
        search,
      });
    },
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있으면 nextCursor 반환, 없으면 undefined
      return lastPage?.data?.hasNext ? lastPage.data.nextCursor : undefined;
    },
    initialPageParam: 0,
  });
}

