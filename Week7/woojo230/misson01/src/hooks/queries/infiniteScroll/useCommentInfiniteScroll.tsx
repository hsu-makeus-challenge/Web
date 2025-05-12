import { useInfiniteQuery } from '@tanstack/react-query';
import { LpCommentFetch } from '../../../apis/lp/lpCommentFetch';

interface InfiniteScrollParams {
  lpId: number;
  order: string;
  limit?: number;
}

const useCommentInfiniteScroll = ({
  order,
  limit = 30,
  lpId,
}: InfiniteScrollParams) => {
  return useInfiniteQuery({
    queryKey: ['lpComment', order],
    queryFn: ({ pageParam }) =>
      LpCommentFetch({
        cursor: pageParam,
        limit,
        orderProps: order,
        lpId,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // console.log('lastPage.hasNext:', lastPage.hasNext);
      // console.log('lastPage.nextCursor:', lastPage.nextCursor);
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
  });
};

export default useCommentInfiniteScroll;
