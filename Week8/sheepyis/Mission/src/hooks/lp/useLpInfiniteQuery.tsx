import { useInfiniteQuery } from "@tanstack/react-query";
import { LpAPI } from "../../apis/lp/lpAxios";
import type { LpResponse } from "../../types/lp";

export const useInfiniteLpQuery = (
  order: "asc" | "desc",
  limit: number,
  search?: string,
  searchField: "title" | "tag" = "title"
) => {
  return useInfiniteQuery<LpResponse>({
    queryKey: ["lps", order, limit, search, searchField],
    queryFn: ({ pageParam = 0 }) =>
      LpAPI(order, pageParam as number | null, limit, search, searchField),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });
};
