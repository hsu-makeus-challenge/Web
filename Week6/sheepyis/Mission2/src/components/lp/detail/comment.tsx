import { useState, useEffect } from "react";
import { useLpCommentInfiniteQuery } from "../../../hooks/lp/useLpCommentInfiniteQuery";
import { useInView } from "react-intersection-observer";
import ListComment from "./list-comment";
import SkeletonComment from "../../skeleton/skeletonComment";

const Comment = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useLpCommentInfiniteQuery(1, order, 5);

  const { ref, inView } = useInView({ threshold: 1 });

  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isFetchingNextPage) {
      setShowSkeleton(true);
      timeout = setTimeout(() => {
        setShowSkeleton(false);
      }, 500);
    } else {
      setShowSkeleton(false);
    }

    return () => clearTimeout(timeout);
  }, [isFetchingNextPage]);

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="w-full h-full rounded bg-gray-700 flex justify-center py-[1vw]">
      <div className="w-[80%] flex gap-[2vw] flex-col items-center">
        <div className="w-full flex justify-between items-center">
          <p className="text-[1vw]">댓글</p>
          <div className="flex gap-[1vw] text-[1vw]">
            <button
              onClick={() => setOrder("asc")}
              className={`px-[1vw] py-[0.5vw] rounded cursor-pointer ${
                order === "asc"
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              오래된 순
            </button>
            <button
              onClick={() => setOrder("desc")}
              className={`px-[1vw] py-[0.5vw] rounded cursor-pointer ${
                order === "desc"
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              최신순
            </button>
          </div>
        </div>

        <div className="flex w-full items-center gap-[1vw]">
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            className="flex-1 px-[1vw] py-[0.5vw] border border-gray-500 rounded text-sm bg-transparent text-white placeholder-gray-400 text-[1vw]"
          />
          <button className="px-[1vw] py-[0.5vw] bg-white text-black text-sm rounded hover:bg-gray-200 transition disabled:bg-gray-500 disabled:cursor-not-allowed text-[1vw]">
            작성
          </button>
        </div>

        <ListComment data={comments} />

        {showSkeleton && (
          <div className="flex flex-col gap-[1vw] w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonComment key={i} />
            ))}
          </div>
        )}

        <div ref={ref} className="h-[100px]" />
      </div>
    </div>
  );
};

export default Comment;
