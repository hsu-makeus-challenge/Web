import instance from './axios';

const deleteUser = async () => {
  try {
    const response = await instance.delete('/v1/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default deleteUser;
