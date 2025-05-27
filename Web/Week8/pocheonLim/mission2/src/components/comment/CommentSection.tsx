import { MdMoreVert, MdEdit, MdDelete } from 'react-icons/md';
import { Comment } from '../../types/comment';
import SkeletonComment from '../skeleton/SkeletonComment';

interface CommentSectionProps {
  commentOrder: 'asc' | 'desc';
  handleSortChange: (order: 'asc' | 'desc') => void;
  commentInput: string;
  setCommentInput: (value: string) => void;
  commentError: string;
  isCommentLoading: boolean;
  isFetchingNextPage: boolean;
  comments: Comment[];
  user: { id: number } | null;
  showMenuId: number | null;
  setShowMenuId: (id: number | null) => void;
  editingCommentId: number | null;
  editedContent: string;
  setEditedContent: (value: string) => void;
  handleCommentSubmit: () => void;
  handleCommentEdit: (id: number, content: string) => void;
  handleCommentDelete: (id: number) => void;
  handleCommentUpdate: (id: number, content: string) => void;
  handleCommentEditCancel: () => void;
  createCommentMutation: { isPending: boolean };
  updateCommentMutation: { isPending: boolean };
  COMMENT_LIMIT: number;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export const CommentSection = ({
  commentOrder,
  handleSortChange,
  commentInput,
  setCommentInput,
  commentError,
  isCommentLoading,
  isFetchingNextPage,
  comments,
  user,
  showMenuId,
  setShowMenuId,
  editingCommentId,
  editedContent,
  setEditedContent,
  handleCommentSubmit,
  handleCommentEdit,
  handleCommentDelete,
  handleCommentUpdate,
  handleCommentEditCancel,
  createCommentMutation,
  updateCommentMutation,
  COMMENT_LIMIT,
  scrollRef,
}: CommentSectionProps) => {
  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-bold text-white">댓글</div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${commentOrder === 'asc' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleSortChange('asc')}
          >
            오래된순
          </button>
          <button
            className={`px-3 py-1 rounded ${commentOrder === 'desc' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleSortChange('desc')}
          >
            최신순
          </button>
        </div>
      </div>
     
      <div className="flex items-start gap-2 mb-4">
        <div className="flex-1">
          <textarea
            className="w-full rounded bg-gray-800 text-white p-2 resize-none min-h-[48px]"
            placeholder="댓글을 입력하세요"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            disabled={createCommentMutation.isPending}
          />
        </div>
        <button
          className={`bg-pink-500 text-white px-4 py-2 rounded font-bold ${commentInput.trim() && !createCommentMutation.isPending ? '' : 'opacity-60 cursor-not-allowed'}`}
          disabled={!commentInput.trim() || createCommentMutation.isPending}
          onClick={handleCommentSubmit}
        >
          {createCommentMutation.isPending ? '등록 중...' : '등록'}
        </button>
      </div>
      {commentError && <div className="text-red-400 mb-2 text-sm w-full text-center">{commentError}</div>}
      
      <div ref={scrollRef} className="bg-[#232b3b] rounded-lg max-h-80 overflow-y-auto p-4 space-y-4">
        {(isCommentLoading || isFetchingNextPage) &&
          Array.from({ length: COMMENT_LIMIT }).map((_, idx) => (
            <SkeletonComment key={`skeleton-comment-${idx}`} />
          ))}
        {!isCommentLoading && !isFetchingNextPage && comments.length === 0 && (
          <div className="text-center text-gray-400">아직 댓글이 없습니다.</div>
        )}
        {!isCommentLoading && !isFetchingNextPage && comments.map((comment) => {
          const isMine = user?.id === comment.authorId;
          return (
            <div key={comment.id} className="flex items-start gap-3 relative group">
              <img src={comment.author.avatar || '/images/user.png'} alt="작성자" className="w-8 h-8 rounded-full" />
              <div className="flex-1 bg-gray-800 rounded px-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm text-white font-semibold">{comment.author.name}</div>
                  {isMine && (
                    <div className="relative">
                      <button
                        className="p-1 hover:bg-gray-700 rounded"
                        onClick={() => setShowMenuId(showMenuId === comment.id ? null : comment.id)}
                      >
                        <MdMoreVert size={20} />
                      </button>
                      {showMenuId === comment.id && (
                        <div className="absolute right-0 mt-1 bg-gray-900 text-white rounded shadow-lg z-10">
                          <button
                            className="flex items-center gap-1 px-3 py-2 hover:bg-gray-700 w-full"
                            onClick={() => handleCommentEdit(comment.id, comment.content)}
                          >
                            <MdEdit /> 
                          </button>
                          <button
                            className="flex items-center gap-1 px-3 py-2 hover:bg-gray-700 w-full text-red-400"
                            onClick={() => handleCommentDelete(comment.id)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {editingCommentId === comment.id ? (
                  <div className="mt-1">
                    <textarea
                      className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
                      value={editedContent}
                      onChange={e => setEditedContent(e.target.value)}
                      rows={2}
                    />
                    <div className="flex gap-2 mt-1 justify-end">
                      <button
                        className="px-2 py-1 rounded bg-gray-700 text-white"
                        onClick={handleCommentEditCancel}
                      >
                        취소
                      </button>
                      <button
                        className="px-2 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
                        disabled={!editedContent.trim() || updateCommentMutation.isPending}
                        onClick={() => handleCommentUpdate(comment.id, editedContent)}
                      >
                        저장
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-200 text-sm mb-1 whitespace-pre-line">{comment.content}</div>
                )}
                <div className="text-xs text-gray-400 text-right">{new Date(comment.createdAt).toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 