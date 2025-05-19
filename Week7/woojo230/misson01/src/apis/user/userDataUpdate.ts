import instance from '../auth/axios';
import { UserDataUpdateType } from '../../type/type';

interface UserDataUpdateProps {
  userData: UserDataUpdateType;
}

const userDataUpdate = async ({ userData }: UserDataUpdateProps) => {
  try {
    const response = await instance.patch(
      `${import.meta.env.VITE_SERVER_URL}/v1/users`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], nextCursor: null, hasNext: false };
  }
};

export default userDataUpdate;
