import instance from '../auth/axios';

export const lpLikePost = async (lpId: number) => {
  try {
    const response = await instance.post(`/v1/lps/${lpId}/likes`);
    return response.data;
  } catch (error) {
    console.error('좋아요 실패', error);
    throw error;
  }
};

export const lpLikeDelete = async (lpId: number) => {
  try {
    const response = await instance.delete(`/v1/lps/${lpId}/likes`);
    return response.data;
  } catch (error) {
    console.error('좋아요 취소 실패', error);
    throw error;
  }
};
