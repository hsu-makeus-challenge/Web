import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';

const MyPage = () => {
  const [user, setUser] = useState(null);

  const userData = async () => {
    try {
      const response = await axios.get('/v1/users/me');
      setUser(response.data);
    } catch (error) {
      console.error('유저정보 조회 실패:', error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <>
      <div>마이페이지</div>
    </>
  );
};

export default MyPage;
