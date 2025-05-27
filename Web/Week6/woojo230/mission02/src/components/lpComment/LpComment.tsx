import { useState } from 'react';
import type { LpCommentType } from '../../type/type';
import LpCommentItem from './LpCommentItem';
import LpCommentItemSkeleton from '../skeleton/LpCommentItemSkeleton';

interface CommentProps {
  commentData: LpCommentType[] | undefined;
  isFetching: boolean;
  isLoading: boolean;
}

const LpComment = ({ commentData, isFetching, isLoading }: CommentProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    console.log('작성된 댓글:', newComment);
    setNewComment('');
  };

  return (
    <>
      <div className="flex items-center gap-3 rounded-lg mt-5">
        <input
          type="text"
          className="flex-grow px-3 py-2 rounded focus:outline-none text-sm bg-lime-600"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          onClick={handleSubmit}
          className="shrink-0 px-4 py-2 bg-lime-800 text-white text-sm rounded hover:bg-lime-900 cursor-pointer"
        >
          등록
        </button>
      </div>
      <div className="mt-6">
        {commentData?.length === 0 && (
          <p className="text-center text-gray-400">댓글이 아직 없음</p>
        )}
        {commentData?.map((comment) => (
          <LpCommentItem key={comment.id} comment={comment} />
        ))}
        {isFetching &&
          !isLoading &&
          Array.from({ length: 5 }).map((_, idx) => (
            <LpCommentItemSkeleton key={idx} />
          ))}
      </div>
    </>
  );
};

export default LpComment;
