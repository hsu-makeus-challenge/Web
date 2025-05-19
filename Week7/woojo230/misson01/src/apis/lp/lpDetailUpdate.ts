import { LpDetailUpdateType } from '../../type/type';
import instance from '../auth/axios';

interface LpDetailUpdateProps {
  lpId: number;
  lpDetailData: LpDetailUpdateType;
}

const lpDetailUpdate = async ({ lpId, lpDetailData }: LpDetailUpdateProps) => {
  try {
    const response = await instance.patch(`/v1/lps/${lpId}`, lpDetailData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default lpDetailUpdate;
