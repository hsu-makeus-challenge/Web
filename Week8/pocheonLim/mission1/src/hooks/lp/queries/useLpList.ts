import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLpList } from '../../../apis/lp';

export const LIMIT = 30;

export const useLpList = (order: 'asc' | 'desc', search?: string) => {
  return useInfiniteQuery({
    queryKey: ['lpList', order, search],
    queryFn: ({ pageParam = 0 }) => fetchLpList({ order, cursor: pageParam, limit: LIMIT, search }),
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 2,         
    gcTime: 1000 * 60 * 10,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}; 