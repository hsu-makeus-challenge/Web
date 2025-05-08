import instance from '../auth/axios';

export const LpDetailFetch = async (Lpid: number) => {
  try {
    const response = await instance.get(`/v1/lps/${Lpid}`);
    return response.data.data || null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
