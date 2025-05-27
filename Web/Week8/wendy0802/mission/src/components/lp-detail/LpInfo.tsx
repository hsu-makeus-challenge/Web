import React from "react";

interface LpInfoProps {
  lpData: any;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  isLiked: boolean;
  onLike: () => void;
  onDislike: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const LpInfo: React.FC<LpInfoProps> = ({
  lpData,
  isPlaying,
  setIsPlaying,
  isLiked,
  onLike,
  onDislike,
  onEdit,
  onDelete,
}) => {
  if (!lpData) return null;
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{lpData.title}</h2>
      <img src={lpData.thumbnail} alt={lpData.title} className="w-full h-48 object-cover rounded mb-2" />
      <div className="flex gap-2 mb-2">
        <button onClick={isLiked ? onDislike : onLike} className="text-pink-400">
          {isLiked ? "♥" : "♡"}
        </button>
        <button onClick={onEdit} className="text-blue-400">수정</button>
        <button onClick={onDelete} className="text-red-400">삭제</button>
      </div>
      <div className="text-sm text-gray-300">{lpData.createdAt}</div>
    </div>
  );
};

export default LpInfo; 