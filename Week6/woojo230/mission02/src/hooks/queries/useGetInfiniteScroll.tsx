import { useInfiniteQuery } from '@tanstack/react-query';
import { lpFetchData } from '../../apis/lp/lpFetch';

interface InfiniteScrollParams {
  order: string;
  limit?: number;
  search?: string;
}

const useGetInfiniteScroll = ({
  order,
  limit = 30,
  search = '',
}: InfiniteScrollParams) => {
  return useInfiniteQuery({
    queryKey: ['lp', order, search],
    queryFn: ({ pageParam }) =>
      lpFetchData({
        cursor: pageParam,
        limit,
        search,
        orderProps: order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
  });
};

export default useGetInfiniteScroll;
