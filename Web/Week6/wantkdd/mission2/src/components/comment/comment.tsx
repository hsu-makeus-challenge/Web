import React from 'react';
import type { Comment } from '../../types/lp-detail';

interface CommentProps {
  comment: Comment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => (
  <div className="py-3 border-b border-gray-800">
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
        {comment.author.avatar ? (
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          comment.author.name.charAt(0)
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-sm">{comment.author.name}</span>
          <span className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-gray-300">{comment.content}</p>
      </div>
    </div>
  </div>
);

export default Comment;
