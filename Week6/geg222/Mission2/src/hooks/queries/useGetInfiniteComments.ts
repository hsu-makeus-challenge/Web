import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpCommentsById } from "../../apis/lp";

function useGetInfiniteComments(lpId: number, limit: number = 5, order: "asc" | "desc") {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpCommentsById(lpId, { cursor: pageParam, limit, order }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
    enabled: !!lpId,
  });
}

export default useGetInfiniteComments;
