import type { JSX } from 'react';
import { useModalStore } from '../hooks/useModalStore';
import { useCartActions } from '../hooks/useCartStore';

const Modal = (): JSX.Element | null => {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const { clearCart } = useCartActions();

  if (!isOpen) return null;

  const handleClose = () => closeModal();
  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 min-w-[320px] flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-6 text-lg font-semibold text-gray-800">정말 삭제하시겠습니까?</div>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition cursor-pointer"
            onClick={handleClose}
          >
            아니요
          </button>
          <button
            className="px-6 py-2 rounded bg-red-500 text-white font-medium hover:bg-red-600 transition cursor-pointer"
            onClick={handleConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;