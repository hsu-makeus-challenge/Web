import React from 'react';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg text-center">
        <p>{message}</p>
        <div className="flex justify-around mt-2.5">
          <button onClick={onConfirm} className="bg-blue-500 text-white py-2 px-5 rounded cursor-pointer">
            네
          </button>
          <button onClick={onCancel} className="bg-red-500 text-white py-2 px-5 rounded cursor-pointer">
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
