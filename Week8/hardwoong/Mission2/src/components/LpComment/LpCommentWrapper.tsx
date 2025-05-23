import { useState } from "react";
import useEditComment from "../../hooks/mutations/useEditComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { Comment } from "../../types/comment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import LpComment from "./LpComment";
import { PAGINATION_ORDER } from "../../enums/common";

type Props = {
  comment: Comment;
  lpId: number;
  order: PAGINATION_ORDER;
};

const LpCommentWrapper = ({ comment, lpId, order }: Props) => {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [menuOpen, setMenuOpen] = useState(false);

  const accessToken = localStorage.getItem("accessToken") || "";
  const { data: me } = useGetMyInfo(accessToken);
  const meId = me?.data.id;

  const { mutate: editComment } = useEditComment(lpId, order);
  const { mutate: deleteComment } = useDeleteComment(lpId, order);

  const handleEdit = () => {
    if (editContent.trim()) {
      editComment({ commentId: comment.id, content: editContent });
      setEditing(false);
    }
  };

  const isAuthor = comment.author.id === meId;

  return (
    <div className="p-3 text-white">
      <div className="flex justify-between items-start">
        <LpComment comment={comment} />
        {isAuthor && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white cursor-pointer text-xl"
            >
              ⋯
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-22 bg-[#282828] rounded shadow-lg py-1 z-10 transition-opacity duration-200">
                <EditComment
                  onClick={() => {
                    setEditing(true);
                    setMenuOpen(false);
                  }}
                />
                <DeleteComment
                  onClick={() => {
                    deleteComment({ commentId: comment.id });
                    setMenuOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {editing ? (
        <div className="mt-2 space-y-2">
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 bg-[#1b1b1b] text-white border border-gray-600 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(false)}
              className="text-sm text-gray-400 hover:text-white"
            >
              취소
            </button>
            <button
              onClick={handleEdit}
              className="text-sm bg-[#FF4E6B] text-white px-3 py-1 rounded hover:bg-[#FF0436]"
            >
              저장
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LpCommentWrapper;