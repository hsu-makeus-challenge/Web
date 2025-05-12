import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import LPCard from '../components/LPCard';
import Navbar from '../components/Navbar';
import SkeletonCard from '../components/SkeletonCard';

const LPListPage = () => {
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteLpList({ order, limit: 20 });
  const { ref, inView } = useInView();

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  if (error) return <div className="text-center text-red-500">에러 발생</div>;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black dark:bg-gray-900 shadow-md">
        <Navbar />
      </nav>
      
      <main className="pt-16 relative min-h-screen">
        <div className="py-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-green-500">LP</h1>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setOrder('desc')}
              className={`px-4 py-2 rounded-full font-bold shadow-md transition ${order === 'desc' ? 'bg-green-400 text-green-900' : 'bg-white text-green-500 border-2 border-green-400'}`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder('asc')}
              className={`px-4 py-2 rounded-full font-bold shadow-md transition ${order === 'asc' ? 'bg-green-400 text-green-900' : 'bg-white text-green-500 border-2 border-green-400'}`}
            >
              최신순
            </button>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
              {data?.pages.flatMap((page) =>
                page.data.data.map((lp: any) => <LPCard key={lp.id} lp={lp} />)
              )}
              {(isLoading || isFetchingNextPage) && Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
            <div ref={ref} style={{ height: 1 }} />
          </div>
        </div>
      </main>
    </>
  );
};

export default LPListPage;