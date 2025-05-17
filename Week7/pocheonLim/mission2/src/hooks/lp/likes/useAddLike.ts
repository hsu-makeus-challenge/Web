import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLike } from '../../../apis/lp';
import { Lp } from '../../../types/lp';

export function useAddLike(lpId: number | string) {
  const queryClient = useQueryClient();

  const addLikeMutation = useMutation({
    mutationFn: () => addLike(Number(lpId)),
    onMutate: async () => {
      const previousData = queryClient.getQueryData(['lpDetail', lpId]);
      queryClient.setQueryData(['lpDetail', lpId], (old: Lp | undefined) => {
        if (!old) return old;
        return {
          ...old,
          likes: [...(old.likes || []), { userId: null, lpId: Number(lpId) }]
        };
      });
      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['lpDetail', lpId], context.previousData);
      }
      alert('좋아요 추가에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail', lpId] });
    }
  });

  return addLikeMutation;
} 