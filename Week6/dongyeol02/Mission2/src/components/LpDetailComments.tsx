import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getCommentsByLpId } from "../apis/comments";
import CommentSkeletonList from "./CommentSkeletonList";

const LpDetailWithComments = () => {
  const { id: lpId } = useParams();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", lpId, order],
      queryFn: ({ pageParam }: QueryFunctionContext) =>
        getCommentsByLpId({ lpId: lpId!, cursor: pageParam, order }),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
      initialPageParam: undefined,
      enabled: !!lpId,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="mt-8">
      {/*댓글 작성  */}
      <div className="mt-6">
        <textarea
          className="w-full border rounded p-2"
          placeholder="댓글을 입력하세요..."
          disabled
        />
        <button
          className="bg-gray-300 text-white px-4 py-2 rounded mt-2 cursor-not-allowed"
          disabled
        >
          작성
        </button>
      </div>

      {/*최신 , 예전 버튼 */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setOrder("asc")}
          className={`px-3 py-1 border rounded ${
            order === "asc" ? "bg-black text-white" : "bg-white"
          }`}
        >
          오래된 순
        </button>
        <button
          onClick={() => setOrder("desc")}
          className={`px-3 py-1 border rounded ${
            order === "desc" ? "bg-black text-white" : "bg-white"
          }`}
        >
          최신 순
        </button>
      </div>

      <ul className="space-y-2">
        {data?.pages.flatMap((page) =>
          page.data.map((comment) => (
            <li key={comment.id} className="p-3 border rounded">
              <p className="font-semibold text-sm">{comment.author.name}</p>
              <p className="text-gray-800 text-sm">{comment.content}</p>
            </li>
          ))
        )}
      </ul>

      <div ref={ref} className="text-center py-4 text-gray-500">
        {isFetchingNextPage && <CommentSkeletonList count={15} />}
      </div>
    </div>
  );
};

export default LpDetailWithComments;
