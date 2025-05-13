import { useInfiniteQuery } from "@tanstack/react-query";
import { getLPList } from "../../api/lp";
import { QUERY_KEY } from "../../constants/key";

interface UseInfiniteLpListParams {
  order?: "desc" | "asc";
  limit?: number;
  search?: string;
  lpid: string;
}

export default function useGetInfiniteLpList({ order = "desc", limit = 20, search = "", lpid }: UseInfiniteLpListParams) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.LP_LIST, order, search, lpid],
    queryFn: ({ pageParam = 0 }) =>
      getLPList({ order, limit, cursor: pageParam, search }),
    getNextPageParam: (lastPage: any) => lastPage?.data?.nextCursor ?? undefined,
    initialPageParam: 0,
  });
}