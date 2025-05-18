import instance from './axios';

const signOut = async () => {
  try {
    const response = await instance.post('/v1/auth/signout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default signOut;
