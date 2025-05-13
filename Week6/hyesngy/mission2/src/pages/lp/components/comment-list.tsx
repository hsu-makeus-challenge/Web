import { useRef, useEffect } from "react";
import type { Comment } from "@typedefs/comment";
import CommentItem from "./comment-item";
import CommentSkeleton from "./comment-skeleton";

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

const CommentList = ({
  comments,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: CommentListProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-full">
      <div className="mb-6 rounded-md flex justify-between items-center gap-2">
        <input
          type="text"
          className="border w-full h-10 flex-1 text-white p-2 rounded-md"
          placeholder="댓글을 입력해주세요..."
        />

        <button className="px-4 py-2 bg-gray-100 text-black cursor-pointer hover:bg-gray-300 rounded-md transition-colors duration-200 ease-in-out">
          등록
        </button>
      </div>

      <div className="space-y-1">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}

        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <CommentSkeleton key={`skeleton-${index}`} />
          ))}

        <div
          ref={loaderRef}
          className="h-10 w-full flex justify-center items-center"
        >
          {isFetchingNextPage && <CommentSkeleton />}
          {!hasNextPage && comments.length > 0 && (
            <p className="text-gray-400 text-sm py-4">
              더 이상 댓글이 없습니다
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
