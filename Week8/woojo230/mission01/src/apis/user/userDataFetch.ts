import instance from '../auth/axios';

const userDataFetch = async () => {
  try {
    const response = await instance.get('/v1/users/me');
    return response.data;
  } catch (error) {
    console.error('유저 데이터 조회 실패:', error);
  }
};

export default userDataFetch;
