import React from "react";

const CommentSkeleton: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded p-5 relative overflow-hidden animate-pulse">
      {/* 광택 효과 (Shimmer effect) */}
      <div className="absolute -inset-4 animate-shimmer bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-40" style={{ transform: 'translateX(-100%)' }}></div>
      
      <div className="flex items-center gap-3 mb-3">
        {/* 프로필 이미지 부분 */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 animate-blink"></div>
        
        <div className="flex flex-col gap-2">
          {/* 사용자 이름 부분 */}
          <div className="h-4 w-28 bg-gradient-to-r from-gray-600 to-gray-700 rounded animate-blink"></div>
          {/* 날짜 부분 */}
          <div className="h-3 w-40 bg-gradient-to-r from-gray-700 to-gray-800 rounded"></div>
        </div>
      </div>
      
      {/* 댓글 내용 부분 */}
      <div className="space-y-3 mt-4">
        <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded w-full animate-blink"></div>
        <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded w-[85%] animate-blink" style={{ animationDelay: '0.1s' }}></div>
        <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded w-[65%] animate-blink" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default CommentSkeleton; 