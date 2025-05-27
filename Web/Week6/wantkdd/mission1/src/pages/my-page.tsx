import { useEffect, useState } from 'react';
import { ResponseMyInfoDto } from '../types/auth';
import { getMyInfo } from '../apis/auth';

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>({} as ResponseMyInfoDto);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-800 text-white">
      <section className="max-w-4xl mx-auto mt-10 p-6 bg-gray-700 rounded-lg">
        <div className="p-8 flex flex-col md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-8">
            <div className="w-32 h-32 bg-gray-600 rounded-full flex justify-center items-center overflow-hidden">
              {data.data?.avatar ? (
                <img
                  src={data.data.avatar}
                  alt="프로필 사진"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-4xl">없음</span>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">
              {data.data?.name}님 환영합니다
            </h2>
            <div>
              <p className="text-gray-400 text-sm">이메일</p>
              <p className="font-medium">
                {data.data?.email || '이메일 정보 없음'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyPage;
