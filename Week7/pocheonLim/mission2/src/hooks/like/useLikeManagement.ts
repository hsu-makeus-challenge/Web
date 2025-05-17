import { useAddLike } from '../lp/likes/useAddLike';
import { useRemoveLike } from '../lp/likes/useRemoveLike';
import { useAuth } from '../../contexts/AuthContext';

export const useLikeManagement = (lpId: string, commentOrder: 'asc' | 'desc', likes: { userId: number }[] | undefined) => {
  const { user } = useAuth();
  const addLikeMutation = useAddLike(lpId);
  const removeLikeMutation = useRemoveLike(lpId);

  const isLiked = likes?.some(like => like.userId === user?.id);

  const handleLikeClick = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (isLiked) {
      removeLikeMutation.mutate();
    } else {
      addLikeMutation.mutate();
    }
  };

  return {
    isLiked,
    handleLikeClick,
    addLikeMutation,
    removeLikeMutation
  };
}; 