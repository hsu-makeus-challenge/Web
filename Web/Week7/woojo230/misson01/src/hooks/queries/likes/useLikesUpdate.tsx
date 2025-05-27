import { useMutation, useQueryClient } from '@tanstack/react-query';
import { lpLikePost, lpLikeDelete } from '../../../apis/like/lpLike';

interface LpDetailUpdateProps {
  lpId: number;
}

const useLikesUpdate = () => {
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: ({ lpId }: LpDetailUpdateProps) => lpLikePost(lpId),
    onMutate: async ({ lpId }) => {
      await queryClient.cancelQueries({ queryKey: ['lpDetail'] });
      const previousData = queryClient.getQueryData(['lpDetail']);
      queryClient.setQueryData(['lpDetail'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: true,
          likeCount: (old.likeCount || 0) + 1,
        };
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['lpDetail'], context.previousData);
      }
      alert('좋아요 추가 실패');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ lpId }: LpDetailUpdateProps) => lpLikeDelete(lpId),
    onMutate: async ({ lpId }) => {
      await queryClient.cancelQueries({ queryKey: ['lpDetail'] });
      const previousData = queryClient.getQueryData(['lpDetail']);

      queryClient.setQueryData(['lpDetail'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: false,
          likeCount: Math.max((old.likeCount || 0) - 1, 0),
        };
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['lpDetail'], context.previousData);
      }
      alert('좋아요 취소 실패');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail'] });
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
