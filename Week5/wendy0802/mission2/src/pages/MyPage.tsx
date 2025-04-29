import React, { useEffect, useState } from 'react';

const MyPage = () => {
  const [data, setData] = useState<any>(null);

  const getMyInfo = async () => {
    return {
      data: {
        name: '홍길동',
        avatar: 'https://example.com/avatar.png',
        email: 'hong@example.com',
      }
    };
  };

  const logout = async () => {
    console.log("로그아웃 되었습니다.");
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1>{data?.data?.name}님 환영합니다.</h1>
      <img src={data?.data?.avatar as string} alt={"구글 로그인"} />
      <h1>{data?.data?.email}</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default MyPage;
