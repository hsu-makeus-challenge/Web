import { useState, useEffect } from "react";
import useGetInfiniteCommentList from "../../hooks/queries/useGetInfiniteCommentList";
import useCreateComment from "../../hooks/mutations/useCreateComment";
import { useInView } from "react-intersection-observer";
import SortOrderButtons from "../SortOrderButtons";
import LpCommentSkeletonList from "./LpCommentSkeletonList";
import LpCommentWrapper from "./LpCommentWrapper";
import { PAGINATION_ORDER } from "../../enums/common";

const LpCommentSection = ({ lpId }: { lpId: number }) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [comment, setComment] = useState("");
  const { mutate: createComment } = useCreateComment(lpId, order);

  const {
    data: commentPages,
    isFetching,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isError,
  } = useGetInfiniteCommentList(lpId, order, 3);

  const { ref, inView } = useInView({ threshold: 0 });

  const handleSubmit = () => {
    if (!comment.trim()) return;
    createComment(comment, {
      onSuccess: () => setComment(""),
    });
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">댓글</h3>
        <SortOrderButtons order={order} setOrder={setOrder} />
      </div>
      <div className="flex items-center gap-2 my-8">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 bg-[#2C2C2E] text-white placeholder-gray-400 p-2 rounded"
          placeholder="댓글을 작성하세요."
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded bg-gray-700 whitespace-nowrap"
        >
          작성
        </button>
      </div>
      {isError && <div>Error loading comments</div>}
      <div className="relative mx-auto flex flex-col gap-4">
        {(isLoading || !commentPages?.pages?.length) && <LpCommentSkeletonList count={10} />}
        {commentPages?.pages
          ?.flatMap((page) => page.data.data)
          ?.map((comment) => (
            <LpCommentWrapper key={comment.id} comment={comment} lpId={lpId} order={order} />
          ))}
        {isFetching && <LpCommentSkeletonList count={3} />}
      </div>
      <div ref={ref} className="h-5" />
    </div>
  );
};

export default LpCommentSection;
