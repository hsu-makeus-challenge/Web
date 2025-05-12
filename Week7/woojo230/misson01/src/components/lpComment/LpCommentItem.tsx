import { useState } from 'react';
import type { LpCommentType } from '../../type/type';
import LoadingSpinner from '../loading';
import useCommentMutation from '../../hooks/queries/useUpdateCommentData';

interface Props {
  lpId: number;
  commentId: number;
  comment: LpCommentType;
}

const LpCommentItem = ({ lpId, commentId, comment }: Props) => {
  const { author, content } = comment;
  const userId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const { updateComment, deleteComment, isUpdating, isDeleting } =
    useCommentMutation();

  const handleCommentUpdate = () => {
    updateComment(
      {
        lpId: lpId,
        commentId: commentId,
        content: editedContent,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleCommentDelete = () => {
    deleteComment({
      lpId: lpId,
      commentId: commentId,
    });
  };

  if (isUpdating) return <LoadingSpinner />;
  if (isDeleting) return <LoadingSpinner />;

  return (
    <div className="flex items-start gap-4 p-4 border-b border-lime-500">
      <img
        src={author.avatar ?? 'X'}
        alt={`${author.name} image`}
        className="w-10 h-10 rounded-full object-cover bg-black"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-sm text-emerald-400">
            {author.name}
          </span>
          {/* 현재 사용자 = 댓글 작성자 => 수정/삭제 버튼 표시 */}
          {author.id === Number(userId) && !isEditing && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-lime-400 hover:text-lime-900 cursor-pointer"
              >
                수정
              </button>
              <button
                onClick={handleCommentDelete}
                className="text-sm text-lime-400 hover:text-lime-900 cursor-pointer"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="flex-1 bg-gray-800 text-white text-sm p-1 rounded"
            />
            <button
              onClick={handleCommentUpdate}
              className="text-sm text-lime-400 hover:text-lime-300 cursor-pointer"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedContent(content);
              }}
              className="text-sm text-gray-400 hover:text-white cursor-pointer"
            >
              취소
            </button>
          </div>
        ) : (
          <p className="text-sm text-white whitespace-pre-line">{content}</p>
        )}
      </div>
    </div>
  );
};

export default LpCommentItem;
