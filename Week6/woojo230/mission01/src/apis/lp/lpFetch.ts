import axios from 'axios';

export const lpFetchData = async (orderProps: string) => {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/v1/lps?limit=30&order=${orderProps}`,
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
