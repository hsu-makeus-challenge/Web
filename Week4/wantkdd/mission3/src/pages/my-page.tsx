// import { useEffect } from 'react';
// import { ResponseMyInfoDto } from '../types/auth';
// import { getMyInfo } from '../apis/auth';

const MyPage = () => {
  // useEffect(() => {
  //   const getData = async () => {
  //     const response: ResponseMyInfoDto = await getMyInfo();
  //     console.log(response);
  //   };
  //   getData();
  // }, []);
  return (
    <div className="w-full h-screen justify-center flex items-center">
      <span className="text-green-300 text-4xl font-bold">마이 페이지</span>
    </div>
  );
};

export default MyPage;
