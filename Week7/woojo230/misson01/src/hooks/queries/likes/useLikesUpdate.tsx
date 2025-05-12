import { useMutation, useQueryClient } from '@tanstack/react-query';
import { lpLikePost, lpLikeDelete } from '../../../apis/like/lpLike';

interface LpDetailUpdateProps {
  lpId: number;
}

const useLikesUpdate = () => {
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: ({ lpId }: LpDetailUpdateProps) => lpLikePost(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail'] });
      alert('좋아요가 성공적으로 추가되었습니다!');
    },
    onError: () => {
      alert('좋아요 추가 실패');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ lpId }: LpDetailUpdateProps) => lpLikeDelete(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail'] });
      alert('좋아요가 성공적으로 취소되었습니다!');
    },
    onError: () => {
      alert('좋아요 취소 실패');
    },
  });

  return {
    postLpLike: postMutation.mutate,
    deleteLpLike: deleteMutation.mutate,
    isPosting: postMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export default useLikesUpdate;
