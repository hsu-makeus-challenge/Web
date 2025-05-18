import { useState } from 'react';
import LoadingSpinner from '../components/loading';
import Error from '../components/error';
import useGetInfiniteScroll from '../hooks/queries/infiniteScroll/useGetInfiniteScroll';
import { OrderButtons } from '../components/lp/orderBtn';
import { LpGrid } from '../components/lp/lpGrid';
import useInfiniteScrollObserver from '../hooks/observer/useInfiniteScrollObserver';
import LpAddBtn from '../components/lpAddBtn';
import useLpModalStore from '../stores/LpModal';
import LpAddModal from '../components/modal/lp/LpAddModal';

function Home() {
  const [order, setOrder] = useState('desc');
  const { isLpModalOpen } = useLpModalStore();

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

  const allLpData = lpData?.pages.flatMap((page) => page.data) ?? [];

  const observerRef = useInfiniteScrollObserver(
    hasNextPage,
    isFetching,
    fetchNextPage
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error />;

  return (
    <>
      <OrderButtons
        order={order}
        onAscClick={() => setOrder('asc')}
        onDescClick={() => setOrder('desc')}
      />

      <LpGrid
        lpData={allLpData}
        isFetching={isFetching}
        isLoading={isLoading}
      />

      <LpAddBtn />

      {isLpModalOpen && <LpAddModal />}

      <div ref={observerRef} className="h-10" />
    </>
  );
}

export default Home;
