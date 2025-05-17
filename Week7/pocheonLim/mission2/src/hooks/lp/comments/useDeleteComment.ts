import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../../../apis/lp';

export function useDeleteComment(
  lpId: string,
  commentOrder: 'asc' | 'desc',
  setCommentError: (v: string) => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(Number(lpId), commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', lpId, commentOrder] });
    },
    onError: (err: unknown) => {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
      ) {
        setCommentError((err as { response: { data: { message: string } } }).response.data.message);
      } else {
        setCommentError('댓글 삭제 중 오류가 발생했습니다.');
      }
    },
  });
} 