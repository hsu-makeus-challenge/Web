import React from 'react';

interface DeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onConfirm,
  onCancel,
  message = '정말 탈퇴하시겠습니까?',
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center min-w-[340px] relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          onClick={onCancel}
        >×</button>
        <div className="text-white text-lg mb-8 mt-2">{message}</div>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-bold hover:bg-gray-400"
            onClick={onConfirm}
          >
            예
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-pink-500 text-white font-bold hover:bg-pink-600"
            onClick={onCancel}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
