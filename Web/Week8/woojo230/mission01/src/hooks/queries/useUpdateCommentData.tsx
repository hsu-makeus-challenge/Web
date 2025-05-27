import { useMutation, useQueryClient } from '@tanstack/react-query';
import lpCommentUpdate from '../../apis/comment/lpCommentUpdate';
import lpCommentDelete from '../../apis/comment/lpCommentDelete';

interface LpCommentUpdateProps {
  lpId: number;
  commentId: number;
  content?: string;
}

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ lpId, commentId, content }: LpCommentUpdateProps) =>
      lpCommentUpdate({ lpId, commentId, content: content! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComment'] });
      alert('댓글이 성공적으로 수정되었습니다!');
    },
    onError: () => {
      alert('댓글 수정 실패');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ lpId, commentId }: Omit<LpCommentUpdateProps, 'content'>) =>
      lpCommentDelete(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComment'] });
      alert('댓글이 성공적으로 삭제되었습니다!');
    },
    onError: () => {
      alert('댓글 삭제 실패');
    },
  });

  return {
    updateComment: updateMutation.mutate,
    deleteComment: deleteMutation.mutate,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export default useCommentMutation;
