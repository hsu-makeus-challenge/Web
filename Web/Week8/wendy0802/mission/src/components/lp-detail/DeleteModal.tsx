import React from "react";

interface DeleteModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onCancel, onConfirm, isDeleting }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="bg-white rounded-lg p-6 w-80 text-center">
      <h3 className="text-lg font-bold mb-4 text-gray-900">정말 삭제하시겠습니까?</h3>
      <div className="flex justify-center gap-4 mt-4">
        <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-300 text-gray-800">아니오</button>
        <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-500 text-white" disabled={isDeleting}>
          {isDeleting ? "삭제 중..." : "예"}
        </button>
      </div>
    </div>
  </div>
);

export default DeleteModal; 