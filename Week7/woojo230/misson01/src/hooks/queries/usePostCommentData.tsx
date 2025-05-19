import { useMutation, useQueryClient } from '@tanstack/react-query';
import lpCommentPostFetch from '../../apis/comment/lpCommentPostFetch';

interface PostCommentDataProps {
  lpId: number;
  content: string;
}

const usePostCommentData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpId, content }: PostCommentDataProps) =>
      lpCommentPostFetch(lpId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComment'] });
      alert('댓글이 성공적으로 작성되었습니다!');
    },
    onError: () => {
      alert('댓글 작성 실패');
    },
  });
};

export default usePostCommentData;
