import { useInfiniteQuery } from "@tanstack/react-query";
import { getLps } from "@apis/lp/lp";
import type { GetLpsParams } from "@typedefs/lp";

export function useInfiniteLpsQuery({
  order = "desc",
  limit = 30,
  search,
}: GetLpsParams = {}) {
  return useInfiniteQuery({
    queryKey: ["infiniteLps", { order, limit, search }],
    queryFn: ({ pageParam }) => {
      return getLps({ cursor: pageParam, order, limit, search });
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor;
    },
    staleTime: 1000 * 60 * 5,
  });
}