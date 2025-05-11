import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchComments } from '../apis/lp';

export const COMMENT_LIMIT = 5;

export const useComments = (lpId: string | undefined, order: 'asc' | 'desc') => {
  return useInfiniteQuery({
    queryKey: ['comments', lpId, order],
    queryFn: ({ pageParam = 0 }) => fetchComments({ lpId: lpId!, order, cursor: pageParam, limit: COMMENT_LIMIT }),
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
    enabled: !!lpId,
    staleTime: 1000 * 60 * 2,         
    gcTime: 1000 * 60 * 10,         
    refetchInterval: 30000,        
    refetchIntervalInBackground: true,
  });
}; 