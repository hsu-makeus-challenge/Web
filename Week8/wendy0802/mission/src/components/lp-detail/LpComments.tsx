import React, { forwardRef } from 'react';
import { Comment } from '../../types/lp';

interface LpCommentsProps {
  lpId: number;
  comments: Comment[];
  commentContent: string;
  setCommentContent: (content: string) => void;
  commentOrder: 'desc' | 'asc';
  setCommentOrder: (order: 'desc' | 'asc') => void;
  onSubmitComment: () => void;
  onUpdateComment: (commentId: number, content: string) => void;
  onDeleteComment: (commentId: number) => void;
  isLoading: boolean;
  hasError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const LpComments = forwardRef<HTMLDivElement, LpCommentsProps>(({
  lpId,
  comments,
  commentContent,
  setCommentContent,
  commentOrder,
  setCommentOrder,
  onSubmitComment,
  onUpdateComment,
  onDeleteComment,
  isLoading,
  hasError,
  hasNextPage,
  isFetchingNextPage
}, ref) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <select
          value={commentOrder}
          onChange={(e) => setCommentOrder(e.target.value as 'desc' | 'asc')}
          className="bg-gray-800 text-white px-3 py-1 rounded"
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800 p-4 rounded">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white font-medium">{comment.author?.name || '익명'}</p>
                <p className="text-gray-300 mt-1">{comment.content}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onUpdateComment(comment.id, comment.content)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  수정
                </button>
                <button
                  onClick={() => onDeleteComment(comment.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="댓글을 작성해주세요..."
          className="w-full bg-gray-800 text-white p-3 rounded"
          rows={3}
        />
        <button
          onClick={onSubmitComment}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          댓글 작성
        </button>
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-4 text-center">
          {isFetchingNextPage ? (
            <p className="text-gray-400">로딩 중...</p>
          ) : (
            <button
              onClick={() => {}}
              className="text-green-500 hover:text-green-400"
            >
              더 보기
            </button>
          )}
        </div>
      )}
    </div>
  );
});

LpComments.displayName = 'LpComments';

export default LpComments; 