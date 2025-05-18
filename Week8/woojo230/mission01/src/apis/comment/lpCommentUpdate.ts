import instance from '../auth/axios';

interface LpCommentUpdateProps {
  lpId: number;
  commentId: number;
  content: string;
}

const lpCommentUpdate = async ({
  lpId,
  commentId,
  content,
}: LpCommentUpdateProps) => {
  try {
    console.log('댓글 수정 요청 파라미터:', { lpId, commentId, content });
    console.log('요청 URL:', `/v1/lps/${lpId}/comments/${commentId}`);

    const res = await instance.patch(`/v1/lps/${lpId}/comments/${commentId}`, {
      content,
    });
    return res.data;
  } catch (error: any) {
    console.error('댓글 수정 실패:', error);
    console.error('에러 응답:', error.response?.data);
    throw error;
  }
};

export default lpCommentUpdate;
