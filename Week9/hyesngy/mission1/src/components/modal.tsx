import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { closeModal } from "../store/modalSlice";
import { clearCart } from "../store/cartSlice";

const Modal: React.FC = () => {
	const dispatch = useDispatch();
	const { isOpen } = useSelector((state: RootState) => state.modal);

	if (!isOpen) return null;

	const handleConfirm = () => {
		dispatch(clearCart());
		dispatch(closeModal());
	};

	const handleCancel = () => {
		dispatch(closeModal());
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			dispatch(closeModal());
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
			onClick={handleBackdropClick}
		>
			<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
				<div className="mb-6 text-center">
					<p className="text-lg text-gray-800">정말 삭제하시겠습니까?</p>
				</div>

				<div className="flex justify-center gap-4">
					<button
						type="button"
						onClick={handleConfirm}
						className="px-6 py-2 border border-gray-500 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
					>
						네
					</button>

					<button
						type="button"
						onClick={handleCancel}
						className="px-6 py-2 border border-gray-500 rounded-lg hover:bg-gray-100 transition-colors font-medium"
					>
						아니요
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
