import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchComments } from '../../apis/lp';

export const COMMENT_LIMIT = 5;

export const useComments = (lpId: string | undefined, order: 'asc' | 'desc') => {
  return useInfiniteQuery({
    queryKey: ['comments', lpId, order],
    queryFn: ({ pageParam = 0 }) => fetchComments({ lpId: lpId!, order, cursor: pageParam, limit: COMMENT_LIMIT }),
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
    enabled: !!lpId,
    staleTime: 0,        
    gcTime: 1000 * 60 * 5,         
    refetchInterval: false,     
    refetchIntervalInBackground: false,
  });
}; 