const LpCommentSkeleton = () => {
  return (
    <div className="flex overflow-hidden items-start space-x-3 py-3 animate-pulse">
      <div className="w-8 h-8 bg-gray-700 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="w-1/4 h-4 bg-gray-700 rounded" />
        <div className="w-full h-3 bg-gray-700 rounded" />
        <div className="w-5/6 h-3 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default LpCommentSkeleton;