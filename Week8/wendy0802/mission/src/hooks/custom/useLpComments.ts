import { useState } from "react";
// import { Comment } from "../../types/lp";

export default function useLpComments(lpId: number) {
  // 예시 상태
  const [commentsData, setCommentsData] = useState<any>(null);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(null);
  const [commentOrder, setCommentOrder] = useState("latest");
  const [commentContent, setCommentContent] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);


  return {
    commentsData,
    isCommentsLoading,
    commentsError,
    commentOrder,
    setCommentOrder,
    commentContent,
    setCommentContent,

    hasNextPage,
    isFetchingNextPage,
    ref: null,
  };
} 