import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getCommentsByLpId } from "../apis/comments";
import CommentSkeletonList from "./CommentSkeletonList";
import usePostComment from "../hooks/mutation/usePostComment";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useDeleteComment from "../hooks/mutation/useDeleteComment";
import { queryClient } from "../App";
import useUpdateComment from "../hooks/mutation/useUpdateComment";

const LpDetailWithComments = () => {
  const { lpId } = useParams();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { ref, inView } = useInView();
  const [comment, setComment] = useState("");
  const { mutate: postCommentMutate } = usePostComment(lpId!);
  const { mutate: deleteCommentMutate } = useDeleteComment(lpId!);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: updateCommentMutate } = useUpdateComment(lpId!);
  const handlePostComment = () => {
    if (!comment.trim()) return;
    postCommentMutate(
      { content: comment },
      {
        onSuccess: () => {
          setComment("");
        },
      }
    );
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutate(commentId, {
      onSuccess: () => {
        setSelectedCommentId(null);
        queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
      },
    });
  };

  const handleUpdateComment = (commentId: number) => {
    if (!editContent.trim()) return;
    updateCommentMutate(
      { commentId, content: editContent },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          setSelectedCommentId(null);
          queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
        },
      }
    );
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", lpId, order],
      queryFn: ({ pageParam }: QueryFunctionContext) =>
        getCommentsByLpId({
          lpId: lpId!,
          cursor: pageParam,
          order,
        }),
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
    <div className="mt-12 bg-gray-100 px-6 py-8 rounded-xl shadow-md">
      {/*댓글 작성*/}
      <div className="mt-6 flex justify-between gap-3 mb-3">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-12 resize-none p-3 rounded-md border border-gray-300"
          placeholder="댓글을 입력하세요..."
        />
        <button
          onClick={handlePostComment}
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-md font-medium mt-1 shadow w-20"
        >
          작성
        </button>
      </div>

      {/*최신 , 예전 버튼*/}
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
            <li key={comment.id} className="p-3 border rounded relative">
              <p className="font-semibold text-sm">{comment.author.name}</p>

              {editingCommentId === comment.id ? (
                <div className="mt-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-20 resize-none p-2 border rounded"
                  />
                  <div className="flex justify-end mt-1 gap-2">
                    <button
                      onClick={() => handleUpdateComment(comment.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="bg-gray-300 text-black px-3 py-1 rounded"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800 text-sm mt-1">{comment.content}</p>
              )}

              {me?.data.id === comment.author.id && (
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => setSelectedCommentId(comment.id)}
                    className="text-gray-900 hover:text-black"
                  >
                    ⋯
                  </button>

                  {selectedCommentId === comment.id && (
                    <div className="absolute top-6 right-0 bg-white border rounded shadow-md z-10">
                      <button
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditContent(comment.content);
                        }}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              )}
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
