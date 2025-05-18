import axios from 'axios';

interface LpFetchProps {
  orderProps: string;
  cursor: number;
  limit: number;
  search: string;
}

export const lpFetchData = async ({
  orderProps,
  cursor,
  limit,
  search,
}: LpFetchProps) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/v1/lps`,
      {
        params: {
          limit,
          order: orderProps,
          cursor,
          search,
        },
        headers: {
          skipAuth: true
        }
      }
    );

    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], nextCursor: null, hasNext: false };
  }
};
