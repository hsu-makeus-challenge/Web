import { useState } from "react";
import type { CommentOrderType } from "@typedefs/comment";
import { useInfiniteCommentsQuery } from "@hooks/use-infinite-comments";
import CommentList from "./comment-list";
import OrderButtons from "@pages/home/components/order-buttons";

interface CommentSectionProps {
  lpId: string | number;
}

const CommentSection = ({ lpId }: CommentSectionProps) => {
  const [order, setOrder] = useState<CommentOrderType>("asc");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCommentsQuery({ lpId, order });

  const handleOrderChange = (newOrder: CommentOrderType) => {
    setOrder(newOrder);
  };

  const comments = [];
  if (data) {
    for (const page of data.pages) {
      if (page.data && page.data.data) {
        comments.push(...page.data.data);
      }
    }
  }

  if (isError) {
    return (
      <div className="text-red-500">
        댓글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="w-full pt-8 flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold text-left">댓글</h2>
        <OrderButtons currentOrder={order} onOrderChange={handleOrderChange} />
      </div>
      <CommentList
        comments={comments}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default CommentSection;
