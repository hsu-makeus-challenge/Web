import axios from 'axios';

interface LpSearchFetchProps {
  tagName: string;
  orderProps: string;
  cursor: number;
  limit: number;
  search: string;
}

export const lpSearchFetchData = async ({
  tagName,
  orderProps,
  cursor,
  limit,
  search,
}: LpSearchFetchProps) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/v1/lps/tag/${tagName}`,
      {
        params: {
          limit,
          order: orderProps,
          cursor,
          search,
        },
        headers: {
          skipAuth: true,
        },
      }
    );

    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], nextCursor: null, hasNext: false };
  }
};
