import type { Comment } from "@typedefs/comment";
import { FaUserCircle } from "react-icons/fa";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex gap-3 py-4 border-b border-zinc-700">
      <div className="flex-shrink-0">
        {comment.author.avatar ? (
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <FaUserCircle size={32} className="text-gray-400" />
        )}
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{comment.author.name}</span>
          <span className="text-xs text-gray-400">
            {comment.createdAt.split("T")[0].replace(/-/g, ".")}
          </span>
        </div>
        <p className="text-sm text-left">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
