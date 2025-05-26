import { useState } from 'react';

export type CommentOrder = 'asc' | 'desc';

export const useCommentSort = () => {
  const [commentOrder, setCommentOrder] = useState<CommentOrder>('asc');

  const handleSortChange = (order: CommentOrder) => {
    setCommentOrder(order);
  };

  return {
    commentOrder,
    handleSortChange
  };
}; 