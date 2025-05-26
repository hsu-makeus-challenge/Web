import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLp } from '../../../apis/lp';

export function useDeleteLp(lpId: number | string, navigate: (path: string) => void) {
  const queryClient = useQueryClient();

  const deleteLpMutation = useMutation({
    mutationFn: () => deleteLp(Number(lpId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      queryClient.invalidateQueries({ queryKey: ['myLps'] });
      navigate('/mypage');
    },
    onError: () => {
      alert('LP 삭제에 실패했습니다.');
    }
  });

  return deleteLpMutation;
} 