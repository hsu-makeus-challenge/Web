import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeLike } from '../../../apis/lp';
import { Lp } from '../../../types/lp';

export function useRemoveLike(lpId: number | string) {
  const queryClient = useQueryClient();

  const removeLikeMutation = useMutation({
    mutationFn: () => removeLike(Number(lpId)),
    onMutate: async () => {
      const previousData = queryClient.getQueryData(['lpDetail', lpId]);
      queryClient.setQueryData(['lpDetail', lpId], (old: Lp | undefined) => {
        if (!old) return old;
        return {
          ...old,
          likes: (old.likes || []).filter((like: Lp['likes'][number]) => like.userId !== null)
        };
      });
      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['lpDetail', lpId], context.previousData);
      }
      alert('좋아요 취소에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail', lpId] });
    }
  });

  return removeLikeMutation;
} 