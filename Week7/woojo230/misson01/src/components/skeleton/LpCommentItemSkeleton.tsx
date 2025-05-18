const LpCommentItemSkeleton = () => {
  return (
    <div className="flex items-start gap-4 p-4 border-b border-lime-500 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-gray-600" />
      <div className="flex-1">
        <div className="h-4 w-24 bg-gray-600 rounded mb-2" />
        <div className="h-3 w-full bg-gray-700 rounded mb-1" />
        <div className="h-3 w-5/6 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default LpCommentItemSkeleton;
