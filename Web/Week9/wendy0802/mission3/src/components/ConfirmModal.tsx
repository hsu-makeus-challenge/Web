import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { closeModal } from '../redux/modal/modalSlice';
import { clearCart, calculateTotals } from '../redux/cart/cartSlice';

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null;

  const handleNo = () => dispatch(closeModal());
  const handleYes = () => {
    dispatch(clearCart());
    dispatch(calculateTotals());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center min-w-[320px]">
        <div className="mb-6 text-lg text-gray-900 font-semibold text-center">정말 삭제하시겠습니까?</div>
        <div className="flex gap-6 w-full justify-center">
          <button
            className="px-8 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            onClick={handleNo}
          >
            아니요
          </button>
          <button
            className="px-8 py-2 rounded bg-red-400 text-white font-semibold hover:bg-red-500 transition"
            onClick={handleYes}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
