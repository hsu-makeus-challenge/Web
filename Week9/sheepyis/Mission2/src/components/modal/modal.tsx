import { useDispatch } from "react-redux";
import { closeModal } from "../../slices/modalSlice";
import { clearCart } from "../../slices/cartSlice";

const Modal = () => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal());
    };

    const handleConfirm = () => {
        dispatch(clearCart());
        dispatch(closeModal());
    };

  return (
        <div className="fixed inset-0 flex items-center justify-center z-2 bg-[rgba(255,255,255,0.7)]">
            <div className="bg-white p-[3vw] rounded shadow-2xl w-[90%] max-w-sm text-center">
                <p className="mb-[2vw] text-lg font-bold">정말 삭제하시겠습니까?</p>
                <div className="flex justify-center gap-[1vw]">
                    <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">아니요</button>
                    <button onClick={handleConfirm} className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer">네</button>
                </div>
            </div>
        </div>
  );
};

export default Modal;
