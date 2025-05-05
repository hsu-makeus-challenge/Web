import LpList from '../components/lp/lpList';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../components/loading';
import Error from '../components/error';
import useGetInfiniteScroll from '../hooks/queries/useGetInfiniteScroll';

function Home() {
  const [order, setOrder] = useState<string>('desc');
  const scrollPosition = useRef(0);

  const handleAsc = () => {
    setOrder('asc');
  };

  const handleDesc = () => {
    setOrder('desc');
  };

  const {
    data: lpData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    error,
  } = useGetInfiniteScroll({
    order: order,
    limit: 50,
    search: '',
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const allLpData = lpData?.pages.flatMap((page) => page.data) ?? [];

  // console.log('엘피데이터', lpData);
  // console.log(isLogin);

  useEffect(() => {
    const handleScroll = () => {
      scrollPosition.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    if (!isFetching && scrollPosition.current > 0) {
      window.scrollTo(0, scrollPosition.current);
    }

    if (observerRef.current) {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasNextPage && !isFetching) {
            scrollPosition.current = window.scrollY;
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );

      observer.current.observe(observerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer.current && observerRef.current) {
        observer.current.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error />;
  if (isFetching) return <LoadingSpinner />;

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
      {lpData && <LpList lpData={allLpData} />}
      <div ref={observerRef} className="h-10" />
    </>
  );
}

export default Home;
