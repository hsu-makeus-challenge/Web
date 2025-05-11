import {useInfiniteQuery} from "@tanstack/react-query";
import {getLpList} from "../../apis/lp.ts";
import {PAGINATION_ORDER} from "../../enums/common.ts";
import {QUERY_KEY} from "../../constants/key.ts";

function useGetInfiniteLpList(limit: number, search: string, order: PAGINATION_ORDER) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: ({ pageParam = 0 }) => getLpList({ cursor: pageParam, limit, search, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선하다고 간주됨
    gcTime: 1000 * 60 * 10,   // 사용되지 않은 데이터는 10분 후 GC
    retry: 2,                 // 실패 시 최대 2번 재시도
    refetchInterval: false,  // 자동 refetch 없음
    select: (data) => data    // 전체 응답 유지
  });
}

export default useGetInfiniteLpList;