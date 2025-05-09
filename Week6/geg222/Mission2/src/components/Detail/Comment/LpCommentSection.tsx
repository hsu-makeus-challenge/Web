import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLpComment } from "../../../apis/lp";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import LpCommentSkeletonList from "./LpCommentSkeletonList";
import useGetInfiniteComments from "../../../hooks/queries/useGetInfiniteComments";
import SortButtons from "../../SortButtons";

type Props = {
  lpId: number;
};

const LpCommentSection = ({ lpId }: Props) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteComments(lpId, 5, order);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  const { mutate } = useMutation({
    mutationFn: (content: string) => postLpComment(lpId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(["lpComments", lpId, order]);
      setComment("");
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
  });

  const handleSubmit = () => {
    if (comment.trim()) mutate(comment);
  };

  return (
    <div className="mt-8 space-y-4 bg-black p-6 rounded-lg">
      <h2 className="text-lg font-semibold">댓글</h2>
      <div className="flex justify-end mb-6">
        <SortButtons order={order} setOrder={setOrder} />
      </div>
      <textarea
        placeholder="댓글을 입력하세요..."
        className="w-full p-3 bg-[#121212] border border-[#333] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-[#1DB954] text-white rounded hover:bg-[#1AA34A] transition"
      >
        등록
      </button>
      <div className="space-y-4">
        {commentsData?.pages
          .flatMap((page) => page.data.data)
          .map((comment) => (
            <div
              key={comment.id}
              className="p-3 border border-[#333] rounded bg-[#121212] text-white"
            >
              <p className="text-sm text-gray-400 font-semibold">
                {comment.author.name}
              </p>
              <p className="text-sm mt-1">{comment.content}</p>
            </div>
          ))}
        {isFetchingNextPage && hasNextPage && <LpCommentSkeletonList count={5} />}
      </div>

      <div
        ref={(el) => {
          ref(el); 
          bottomRef.current = el;
        }}
        className="h-10"
      />
    </div>
  );
};

export default LpCommentSection;
