import type { CommentItem } from "../../../types/comment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import CommentModal from "./commentModal";
import { useState } from "react";
import { useCommentDeleteMutation } from "../../../hooks/lp/useCommentDeleteMutation";
import { useCommentUpdateMutation } from "../../../hooks/lp/useCommentUpdateMutation";
import { useParams } from "react-router-dom";

type Props = {
  comment: CommentItem;
};

const ItemComment = ({ comment }: Props) => {
  const { id } = useParams();
  const lpId = Number(id);
  const userId = localStorage.getItem("userId");
  const isOwner = Number(userId) == comment.author.id + 1;
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const { mutate: deleteComment } = useCommentDeleteMutation();
  const { mutate: updateComment } = useCommentUpdateMutation();

  const handleDelete = () => {
    deleteComment({ lpId, commentId: comment.id });
    setShowMenu(false);
  };

  const handleUpdate = () => {
    updateComment({ lpId, commentId: comment.id, content: editedContent });
    setIsEditing(false);
  };


  return (
    <div className="flex gap-[1vw] items-start bg-gray-800 p-[1vw] rounded">
      {comment.author.avatar ? (
          <img src={comment.author.avatar} alt="author" className="rounded-full w-[4vw] h-[4vw]"/>
        ) : (
          <div className="rounded-full w-[4vw] h-[4vw] bg-gray-500" />
        )}
        <div className="flex flex-col w-full">
        <p className="text-white text-[1.2vw]">{comment.author.name}</p>

        {isEditing ? (
          <div className="flex gap-[1vw] items-center">
            <input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="bg-gray-700 border border-white rounded px-[1vw] py-[0.3vw] text-white text-[1vw] w-full"
            />
            <button onClick={handleUpdate} className="text-white hover:text-green-400 text-[1.2vw]">
              <FiCheck />
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-[1vw]">{comment.content}</p>
        )}
      </div>

      {isOwner && (
        <div className="relative">
          <BsThreeDotsVertical size={10} color="#fff" className="cursor-pointer" onClick={() => setShowMenu((prev) => !prev)}/>
          {showMenu && (
            <CommentModal onEdit={() => { setIsEditing(true); setShowMenu(false); }} onDelete={handleDelete} />
          )}
        </div>
      )}
    </div>
  );
};

export default ItemComment;
