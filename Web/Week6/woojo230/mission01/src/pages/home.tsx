import { useQuery } from '@tanstack/react-query';
import { lpFetchData } from '../apis/lp/lpFetch';
import { LpDataType } from '../type/type';
import LpList from '../components/lp/lpList';
import { useState } from 'react';
import LoadingSpinner from '../components/loading';
import Error from '../components/error';

interface LpListProps {
  data: LpDataType[] | null;
}

function Home() {
  const [order, setOrder] = useState<string>('desc');

  const handleAsc = () => {
    setOrder('asc');
  };

  const handleDesc = () => {
    setOrder('desc');
  };

  const {
    data: lpData,
    isLoading,
    isFetching,
    error,
  } = useQuery<LpListProps, Error>({
    queryKey: ['lp', order],
    queryFn: () => lpFetchData(order),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error />;
  if (isFetching) return <LoadingSpinner />;

  // console.log('엘피데이터', lpData);
  // console.log(isLogin);

  return (
    <>
      <div className="flex justify-end w-full mb-1">
        <div className="inline-flex rounded-md overflow-hidden mr-7 border-2 border-lime-500">
          <button
            onClick={handleAsc}
            className={`px-4 py-2 text-sm font-medium cursor-pointer ${
              order === 'asc' ? 'bg-lime-500 text-white' : 'bg-white text-black'
            }`}
          >
            오래된순
          </button>
          <button
            onClick={handleDesc}
            className={`px-4 py-2 text-sm font-medium cursor-pointer ${
              order === 'desc'
                ? 'bg-lime-500 text-white'
                : 'bg-white text-black'
            }`}
          >
            최신순
          </button>
        </div>
      </div>
      {lpData && <LpList lpData={lpData?.data || []} />}
    </>
  );
}

export default Home;
