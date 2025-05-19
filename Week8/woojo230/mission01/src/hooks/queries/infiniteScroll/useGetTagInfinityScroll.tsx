import { useInfiniteQuery } from '@tanstack/react-query';
import { lpSearchFetchData } from '../../../apis/search/lpSearchFetch';

interface InfiniteScrollParams {
  tagName: string;
  order: string;
  limit?: number;
  search?: string;
  enabled?: boolean;
}

const useGetTagInfiniteScroll = ({
  tagName,
  order,
  limit = 30,
  search = '',
  enabled = true,
}: InfiniteScrollParams) => {
  return useInfiniteQuery({
    queryKey: ['tag', tagName, order, search],
    queryFn: ({ pageParam }) =>
      lpSearchFetchData({
        tagName,
        cursor: pageParam,
        limit,
        search,
        orderProps: order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    enabled,
  });
};

export default useGetTagInfiniteScroll;
