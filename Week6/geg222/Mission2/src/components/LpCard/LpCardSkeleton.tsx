const LPcardSkeleton = () => {
  return (
    <div className="relative rounded overflow-hidden animate-pulse bg-gray-700">
      <div className="w-full h-40 bg-gray-600" />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm text-white opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
        <div className="flex justify-between items-end w-full">
          <div>
            <div className="h-4 bg-gray-500 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-500 rounded w-20"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-500 rounded-full" />
            <div className="h-3 w-5 bg-gray-500 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPcardSkeleton;
