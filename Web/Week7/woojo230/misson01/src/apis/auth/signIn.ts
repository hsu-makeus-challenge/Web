import { UserSigninInformation } from '../../utils/validate';
import instance from './axios';

const postLogin = async (userData: UserSigninInformation) => {
  try {
    const response = await instance.post('/v1/auth/signin', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default postLogin;
