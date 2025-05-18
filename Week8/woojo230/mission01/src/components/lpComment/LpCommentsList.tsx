import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useCommentInfiniteScroll from '../../hooks/queries/infiniteScroll/useCommentInfiniteScroll';
import LoadingSpinner from '../loading';
import Error from '../error';
import LpComment from './LpComment';
import useInfiniteScrollObserver from '../../hooks/observer/useInfiniteScrollObserver';
import { OrderButtons } from '../lp/orderBtn';

const LpCommentsList = ({
  observerRef,
}: {
  observerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { Lpid } = useParams<{ Lpid: string }>();
  const lpId: number = Number(Lpid);

  const [order, setOrder] = useState('desc');

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    error,
  } = useCommentInfiniteScroll({
    lpId: lpId,
    order: order,
    limit: 5,
  });

  const allCommentData = commentData?.pages.flatMap((page) => page.data) ?? [];

  // console.log(allCommentData);

  const observer = useInfiniteScrollObserver(
    hasNextPage,
    isFetching,
    fetchNextPage,
    observerRef
  );
  // console.log(lpId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error />;

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">댓글</h2>
        <div className="scale-90">
          <OrderButtons
            order={order}
            onAscClick={() => setOrder('asc')}
            onDescClick={() => setOrder('desc')}
          />
        </div>
      </div>
      <LpComment
        commentData={allCommentData}
        isFetching={isFetching}
        isLoading={isLoading}
        lpId={lpId}
      />
    </>
  );
};

export default LpCommentsList;
