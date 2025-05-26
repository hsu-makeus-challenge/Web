import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearCart } from '../../store/cart/cartSlice';
import { closeModal } from '../../store/modal/modalSlice';

const DeleteModal = () => {
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="text-center mb-4 font-bold">진짜 삭제할거임?</div>
        <div className="flex justify-between">
          <button
            onClick={() => dispatch(closeModal())}
            className="bg-gray-300 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
