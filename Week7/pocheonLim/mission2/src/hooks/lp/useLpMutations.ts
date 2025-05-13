import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLp, deleteLp, updateComment, deleteComment, addLike, removeLike, createComment } from '../../apis/lp';
import { Lp } from '../../types/lp';

export function useLpMutations(lpId: number | string, commentOrder: 'asc' | 'desc', setCommentInput: (v: string) => void, setCommentError: (v: string) => void, setEditingCommentId: (v: number | null) => void, setEditedContent: (v: string) => void, navigate: (path: string) => void) {
  const queryClient = useQueryClient();

  // LP 수정
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

  // LP 삭제
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

  // 댓글 생성
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

  // 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(Number(lpId), commentId, content),
    onSuccess: () => {
      setEditingCommentId(null);
      setEditedContent('');
      queryClient.invalidateQueries({ queryKey: ['comments', lpId, commentOrder] });
    },
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(Number(lpId), commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', lpId, commentOrder] });
    },
  });

  // 좋아요 추가
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

  // 좋아요 취소
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

  return {
    updateLpMutation,
    deleteLpMutation,
    createCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
    addLikeMutation,
    removeLikeMutation
  };
} 