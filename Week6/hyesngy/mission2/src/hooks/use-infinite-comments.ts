import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "@apis/comment/comment";
import type { GetCommentsParams } from "@typedefs/comment";

export function useInfiniteCommentsQuery({
  lpId,
  order = "asc",
  limit = 10,
}: GetCommentsParams) {
  return useInfiniteQuery({
    queryKey: ["comments", lpId, { order, limit }],
    queryFn: ({ pageParam }) => {
      return getComments({ lpId, cursor: pageParam, order, limit });
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor;
    },
    staleTime: 1000 * 60 * 5,
  });
}