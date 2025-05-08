import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import LpCard from '../components/lp-card';
import LpCardSkeletonList from '../components/lp-card-skeleton-list';

const HomePage: React.FC = () => {
  const [order, setOrder] = useState<'desc' | 'asc'>('asc');

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useGetInfiniteLpList(20, order);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allLps = data?.pages.flatMap((page) => page.data.data) || [];

  if (status === 'pending') {
    return (
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <div className="flex justify-end mb-6">
          <div className="bg-gray-800 rounded-lg p-1 inline-flex">
            <div className="px-4 py-2 rounded-md bg-gray-700 w-20 h-10 animate-pulse"></div>
            <div className="px-4 py-2 rounded-md bg-gray-700 w-20 h-10 ml-2 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <LpCardSkeletonList count={20} />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">{error.message}</div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-end mb-6">
        <div className="bg-gray-800 rounded-lg p-1 inline-flex">
          <button
            className={`px-4 py-2 rounded-md transition-all ${
              order === 'asc'
                ? 'bg-pink-600 text-white'
                : 'bg-transparent text-gray-300 hover:text-white'
            }`}
            onClick={() => setOrder('asc')}
          >
            오래된순
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-all ${
              order === 'desc'
                ? 'bg-pink-600 text-white'
                : 'bg-transparent text-gray-300 hover:text-white'
            }`}
            onClick={() => setOrder('desc')}
          >
            최신순
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allLps.length === 0 ? (
          <div className="text-white text-lg col-span-full text-center py-10">
            LP가 없습니다.
          </div>
        ) : (
          <>
            {allLps.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}

            {isFetchingNextPage && <LpCardSkeletonList count={20} />}
          </>
        )}
      </div>
      <div ref={ref} className="h-10 mt-4"></div>
    </div>
  );
};

export default HomePage;
