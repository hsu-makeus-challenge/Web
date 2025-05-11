const SkeletonComment = () => (
  <div className="flex items-start gap-3 animate-pulse">
    <div className="w-8 h-8 rounded-full bg-gray-400" />
    <div className="flex-1 space-y-2">
      <div className="w-24 h-4 bg-gray-400 rounded" />
      <div className="w-3/4 h-4 bg-gray-400 rounded" />
    </div>
  </div>
);

export default SkeletonComment; 