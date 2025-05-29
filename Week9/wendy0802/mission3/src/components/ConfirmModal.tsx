import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/modalslice';
import { clearCart } from '../store/cartslice';
import type { RootState } from '../store/store';

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state: RootState) => state.modal);

  if (!isOpen || type !== 'clearCart') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-8 min-w-[300px] flex flex-col items-center">
        <div className="font-bold z-indextext-lg mb-6">정말 삭제하시겠습니까?</div>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300"
            onClick={() => dispatch(closeModal())}
          >
            아니요
          </button>
          <button
            className="px-6 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-600"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;