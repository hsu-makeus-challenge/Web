import { LpAddType } from '../../type/type';
import instance from '../auth/axios';

interface LpPostProps {
  lpData: LpAddType;
}

export const lpPostData = async ({ lpData }: LpPostProps) => {
  try {
    const response = await instance.post('/v1/lps', lpData);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], nextCursor: null, hasNext: false };
  }
};
