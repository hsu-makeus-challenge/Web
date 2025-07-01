import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { closeModal } from "../slices/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <p className="mb-4 text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => dispatch(closeModal())}
          >
            아니오
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
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
export default Modal;
