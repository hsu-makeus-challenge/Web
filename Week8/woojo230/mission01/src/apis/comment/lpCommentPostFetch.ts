import instance from '../auth/axios';

const lpCommentPostFetch = async (lpId: number, content: string) => {
  try {
    const res = await instance.post(`/v1/lps/${lpId}/comments`, {
      content,
    });
    return res.data;
  } catch (error) {
    console.error('댓글 작성 실패:', error);
    throw error;
  }
};

export default lpCommentPostFetch;
