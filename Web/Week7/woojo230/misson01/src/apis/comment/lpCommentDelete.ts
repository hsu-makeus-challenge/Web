import instance from '../auth/axios';

const lpCommentDelete = async (lpId: number, commentId: number) => {
  try {
    const res = await instance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('댓글을 찾을 수 없습니다.');
    }
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
};

export default lpCommentDelete;
