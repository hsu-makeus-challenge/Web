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
  const token = localStorage.getItem('accessToken');
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/v1/lps?limit=${limit}&order=${orderProps}&cursor=${cursor}&search=${search}`,
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
    return data.data || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], nextCursor: null, hasNext: false };
  }
  // try {
  //   const response = await axios.get('/v1/lps');

  //   if (!response) {
  //     throw new Error('lpFetch 실패');
  //   }

  //   const data = await response;
  //   console.log('데이터요로롱', data.data);

  //   return data.data || [];
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  //   return { data: [] };
  // }
};
