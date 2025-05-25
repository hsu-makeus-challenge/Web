import { useCartActions } from "../hooks/useCartStore";
import { useModalStore, useModalActions } from "../hooks/useModalStore";

const Modal = () => {
  const { clearCart } = useCartActions();
  const { closeModal } = useModalActions();
  const isOpen = useModalStore((state) => state.isOpen);

  if (!isOpen) return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <p className="mb-4 text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
