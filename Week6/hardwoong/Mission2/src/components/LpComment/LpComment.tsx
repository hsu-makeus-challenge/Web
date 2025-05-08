import { Comment } from "../../types/comment.ts";

interface LpCommentProps {
  comment: Comment;
}

const LpComment = ({ comment }: LpCommentProps) => {
  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-700">
      <img
        src={comment.author?.avatar ?? "/default-avatar.png"}
        alt={comment.author.name}
        className="w-8 h-8 rounded-full"
      />
      <div>
        <p className="font-semibold">{comment.author?.name ?? "알 수 없음"}</p>
        <p>{comment.content}</p>
        <span className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default LpComment;