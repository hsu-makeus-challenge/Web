import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../../../apis/lp';

export function useCreateComment(
  lpId: number | string,
  commentOrder: 'asc' | 'desc',
  setCommentInput: (v: string) => void,
  setCommentError: (v: string) => void
) {
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: ({ lpId, content }: { lpId: number; content: string }) =>
      createComment(Number(lpId), content),
    onSuccess: () => {
      setCommentInput('');
      setCommentError('');
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
        setCommentError('댓글 등록 중 오류가 발생했습니다.');
      }
    },
  });

  return createCommentMutation;
} 