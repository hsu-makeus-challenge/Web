import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { ResponseLpListDto } from "../../types/lp";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit: 30,
      }),
    staleTime: 1000 * 60 * 5, //5min
    gcTime: 1000 * 60 * 10, //10min
    //enabled: Boolean(search),
    //refetchInterval: 100 * 60,
    select: (data) => data.data.data,
  });
}

export default useGetLpList;
