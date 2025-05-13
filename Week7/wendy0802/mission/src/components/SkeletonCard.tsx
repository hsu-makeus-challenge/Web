import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative aspect-square w-40 animate-pulse bg-gray-800 rounded-xl">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
          <div className="mt-2 h-3 w-1/2 bg-gray-700 rounded"></div>
          <div className="mt-2 h-3 w-1/3 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;