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
  const token = localStorage.getItem('accessToken');
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/v1/lps/${lpId}/comments?limit=${limit}&order=${orderProps}&cursor=${cursor}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('API 요청 실패');
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
