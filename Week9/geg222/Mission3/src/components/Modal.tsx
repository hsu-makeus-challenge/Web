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
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white px-8 py-6 rounded-xl shadow-lg text-center w-[90%] max-w-sm">
        <p className="mb-6 text-base font-medium text-gray-800">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={closeModal}
            className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 rounded-md bg-[#3182f6] text-white hover:bg-[#1d72e8] transition"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
