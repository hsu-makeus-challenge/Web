import { useInfiniteQuery } from '@tanstack/react-query';
import { getLpList } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';

function useGetInfiniteLpList(
  limit: number,
  order: 'desc' | 'asc',
  search?: string
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, order, search }),
    queryKey: [QUERY_KEY.lps, order, limit, search],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetInfiniteLpList;
