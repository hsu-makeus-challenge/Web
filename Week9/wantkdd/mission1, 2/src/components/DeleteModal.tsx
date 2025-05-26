import { useDispatch } from '../hooks/useCustomRedux';
import { clearCart } from '../slices/cartSlice';
import { closeModal } from '../slices/modalSlice';

const DeleteModal = () => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className="fixed backdrop-blur inset-0 flex items-center justify-center ">
      <div className="bg-white shadow-2xl p-10 rounded w-80 ">
        <h2 className="text-xl font-bold mb-4 text-center">
          정말 삭제하시겠습니까?
        </h2>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleClearCart}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 "
          >
            네
          </button>
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-300"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
