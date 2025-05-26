import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpCommentsById } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/commons";

function useGetInfiniteComments(
  lpId: number,
  limit: number = 5,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpCommentsById(lpId, { cursor: pageParam, limit, order, data: [] }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
    enabled: !!lpId,
  });
}

export default useGetInfiniteComments;
