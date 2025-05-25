import instance from '../auth/axios';

const lpDetailDelete = async (lpId: number) => {
  try {
    const response = await instance.delete(`/v1/lps/${lpId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], nextCursor: null, hasNext: false };
  }
};

export default lpDetailDelete;
