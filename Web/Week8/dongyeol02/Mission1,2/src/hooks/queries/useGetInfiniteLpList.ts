import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PAGIMATION_ORDER } from "../../enums/commons";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGIMATION_ORDER
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    queryKey: [QUERY_KEY.lps, search, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allpages) => {
      //console.log(lastPage, allpages);
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}
export default useGetInfiniteLpList;
