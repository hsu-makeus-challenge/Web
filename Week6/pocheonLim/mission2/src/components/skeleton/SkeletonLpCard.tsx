const SkeletonLpCard = () => {
  return (
    <div className="relative bg-[#232b3b] rounded shadow flex flex-col items-center overflow-hidden animate-pulse">
      <div className="w-full aspect-square bg-gray-700" />
      <div className="absolute bottom-0 left-0 w-full p-3">
        <div className="h-4 w-3/4 bg-gray-700 rounded mb-2" />
        <div className="h-3 w-1/4 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default SkeletonLpCard; 