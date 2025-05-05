import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../components/loading';
import Error from '../components/error';
import useGetInfiniteScroll from '../hooks/queries/useGetInfiniteScroll';
import SkeletonLpItem from '../components/skeleton/skeletonLpItem'; // 스켈레톤 아이템 컴포넌트 import
import LpItem from '../components/lp/lpItem'; // LpItem 컴포넌트도 직접 import

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

  const skeletonCount = 12;
  const skeletonItems = Array.from({ length: skeletonCount }, (_, i) => i);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error />;

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

      <div className="p-10 grid gap-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {allLpData.map((lp) => (
          <LpItem
            key={lp.id}
            id={lp.id}
            title={lp.title}
            thumbnail={lp.thumbnail}
          />
        ))}

        {isFetching &&
          !isLoading &&
          skeletonItems.map((item) => (
            <SkeletonLpItem key={`skeleton-${item}`} />
          ))}
      </div>

      <div ref={observerRef} className="h-10" />
    </>
  );
}

export default Home;
