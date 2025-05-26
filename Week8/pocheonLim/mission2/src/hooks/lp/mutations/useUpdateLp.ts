import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLp } from '../../../apis/lp';

export function useUpdateLp(lpId: number | string) {
  const queryClient = useQueryClient();

  const updateLpMutation = useMutation({
    mutationFn: (updateData: { title: string; content: string; thumbnail: string; tags: string[]; published: boolean }) =>
      updateLp(Number(lpId), updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail', lpId] });
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      queryClient.invalidateQueries({ queryKey: ['myLps'] });
    },
    onError: () => {
      alert('LP 수정에 실패했습니다.');
    }
  });

  return updateLpMutation;
} 