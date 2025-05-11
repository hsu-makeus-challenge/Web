import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentList } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteCommentList(lpId: number, order: "asc" | "desc", limit: number) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comments, { lpId, order }],
    queryFn: ({ pageParam }) =>
      getCommentList(lpId, { cursor: pageParam, limit, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchInterval: false,
    retry: 2,
  });
}

export default useGetInfiniteCommentList;