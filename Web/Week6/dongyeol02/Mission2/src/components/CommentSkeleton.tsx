const CommentSkeleton = () => {
  return (
    <div className="relative rounded-md overflow-hidden shadow animate-pulse p-4 border">
      {/* 이름*/}
      <div className="bg-gray-300 h-4 w-1/4 mb-2 rounded-sm" />
      {/* 댓글 */}
      <div className="bg-gray-200 h-4 w-full mb-1 rounded-sm" />
      <div className="bg-gray-200 h-4 w-5/6 rounded-sm" />
    </div>
  );
};

export default CommentSkeleton;
