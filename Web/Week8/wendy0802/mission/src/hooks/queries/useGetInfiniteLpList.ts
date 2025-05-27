import { useInfiniteQuery } from "@tanstack/react-query";
import { getLPList } from "../../api/lp";
import { QUERY_KEY } from "../../constants/key";
import { LPListResponse } from "../../types/lp";

interface UseInfiniteLpListParams {
  order?: "desc" | "asc";
  limit?: number;
  search?: string;
}

export default function useGetInfiniteLpList({ 
  order = "desc", 
  limit = 20, 
  search = "" 
}: UseInfiniteLpListParams = {}) {
  return useInfiniteQuery<LPListResponse>({
    queryKey: [QUERY_KEY.LP_LIST, order, search],
    queryFn: ({ pageParam = 0 }) =>
      getLPList({ order, limit, cursor: pageParam, search }),
    getNextPageParam: (lastPage) => lastPage?.data?.nextCursor ? Number(lastPage.data.nextCursor) : undefined,
    initialPageParam: 0,
  });
}