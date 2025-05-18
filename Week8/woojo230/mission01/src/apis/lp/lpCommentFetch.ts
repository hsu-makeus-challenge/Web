import instance from '../auth/axios';

interface LpCommentFetchProps {
  orderProps: string;
  cursor: number;
  limit: number;
  lpId: number;
}

export const LpCommentFetch = async ({
  orderProps,
  cursor,
  limit,
  lpId,
}: LpCommentFetchProps) => {
  try {
    const response = await instance.get(`/v1/lps/${lpId}/comments`, {
      params: {
        limit,
        order: orderProps,
        cursor,
      },
    });
    return response.data.data || null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
