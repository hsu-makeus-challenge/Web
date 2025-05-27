import React from "react";

interface LpEditProps {
  lpData: any;
  onCancel: () => void;
  onDelete: () => void;
}

const LpEdit: React.FC<LpEditProps> = ({ lpData, onCancel, onDelete }) => {
  if (!lpData) return null;
  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">LP 수정</h2>
      {/* 실제 수정 폼은 추후 구현 */}
      <div className="flex gap-2 mt-4">
        <button onClick={onCancel} className="text-gray-300">취소</button>
        <button onClick={onDelete} className="text-red-400">삭제</button>
      </div>
    </div>
  );
};

export default LpEdit; 