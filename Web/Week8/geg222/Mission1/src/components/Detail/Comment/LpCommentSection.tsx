import { formatDistanceToNow } from "date-fns";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getLpCommentsById } from "../../../apis/lp";
import { PAGINATION_ORDER } from "../../../enums/commons";
import SortButtons from "../../SortButtons";
import useEditComment from "../../../hooks/mutations/useEditComment";
import useDeleteComment from "../../../hooks/mutations/useDeleteComment";
import useGetMyInfo from "../../../hooks/queries/useGetMyInfo";
import usePostComment from "../../../hooks/mutations/usePostComment";

type Props = {
  lpId: number;
};

const LpCommentSection = ({ lpId }: Props) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpCommentsById(lpId, { cursor: pageParam, limit: 5, order, data: [] }),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
    enabled: !!lpId,
  });

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  const { mutate: postComment } = usePostComment(lpId, order, () =>
    setComment("")
  );

  const accessToken = localStorage.getItem("accessToken");
  const { data: me } = useGetMyInfo(accessToken || "");
  const meId = me?.data.id;

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdownId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const { mutate: editCommentMutate } = useEditComment(lpId, order);
  const { mutate: deleteCommentMutate } = useDeleteComment(lpId, order);

  const handleEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditContent(content);
  };

  const handleEditSubmit = (commentId: number) => {
    if (editContent.trim()) {
      editCommentMutate({ commentId, content: editContent });
      setEditingCommentId(null);
    }
  };

  const handleSubmit = () => {
    if (comment.trim()) postComment(comment);
  };

  return (
    <div className="mt-8 space-y-4 bg-black p-6 rounded-lg">
      <h2 className="text-lg font-semibold">댓글</h2>
      <div className="flex justify-end mb-6">
        <SortButtons order={order} setOrder={setOrder} />
      </div>
      <div className="space-y-2">
        <textarea
          placeholder="댓글을 입력하세요..."
          className="w-full p-3 bg-[#121212] border border-[#333] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!(e as any).nativeEvent.isComposing) {
                handleSubmit();
              }
            }
          }}
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#1DB954] text-white rounded hover:bg-[#1AA34A] transition"
          >
            등록
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {commentsData?.pages
          .flatMap((page) => page.data.data)
          .map((comment) => (
            <div
              key={comment.id}
              className="p-3 border border-[#333] rounded bg-[#121212] text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {comment.author.avatar && (
                    <img
                      src={comment.author.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm text-gray-400 font-semibold">
                      {comment.author.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                {comment.author.id === meId && (
                  <div className="relative">
                    <div
                      className="text-white cursor-pointer text-xl"
                      onClick={() => setActiveDropdownId(comment.id)}
                    >
                      ⋯
                    </div>
                    {activeDropdownId === comment.id && (
                      <div className="absolute right-0 top-full mt-2 w-32 bg-[#282828] rounded shadow-lg py-1 z-10">
                        <button
                          onClick={() =>
                            handleEdit(comment.id, comment.content)
                          }
                          className="flex items-center text-sm text-gray-200 hover:text-white px-4 py-2 w-full text-left hover:bg-[#3e3e3e]"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => deleteCommentMutate(comment.id)}
                          className="flex items-center text-sm text-red-400 hover:text-white px-4 py-2 w-full text-left hover:bg-[#3e3e3e]"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {editingCommentId === comment.id ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 bg-[#1b1b1b] text-white border border-gray-600 rounded"
                    rows={2}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleEditSubmit(comment.id)}
                      className="text-sm bg-[#1DB954] text-white px-3 py-1 rounded hover:bg-[#1AA34A]"
                    >
                      저장
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm mt-1">{comment.content}</p>
              )}
            </div>
          ))}
        {isFetchingNextPage && hasNextPage && (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="p-3 border border-[#333] rounded bg-[#121212] animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-700 rounded" />
                    <div className="h-3 w-16 bg-gray-700 rounded" />
                  </div>
                </div>
                <div className="h-4 w-full bg-gray-700 rounded mt-2" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div ref={ref} className="h-10" />
    </div>
  );
};

export default LpCommentSection;
