const SkeletonLpItem = () => {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md bg-lime-300 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-lime-300 via-lime-200 to-lime-300 bg-[length:200%_100%] animate-shimmer"></div>
    </div>
  );
};

export default SkeletonLpItem;
