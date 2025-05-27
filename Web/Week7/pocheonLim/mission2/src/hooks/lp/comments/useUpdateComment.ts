import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../../../apis/lp';

export function useUpdateComment(
  lpId: string,
  commentOrder: 'asc' | 'desc',
  setEditingCommentId: (v: number | null) => void,
  setEditedContent: (v: string) => void,
  setCommentError: (v: string) => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(Number(lpId), commentId, content),
    onSuccess: () => {
      setEditingCommentId(null);
      setEditedContent('');
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
        setCommentError('댓글 수정 중 오류가 발생했습니다.');
      }
    },
  });
} 