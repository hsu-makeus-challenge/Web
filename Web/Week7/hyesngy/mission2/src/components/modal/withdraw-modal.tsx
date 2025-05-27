import { IoMdClose } from "react-icons/io";

interface WithdrawalModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isLoading?: boolean;
}

const WithdrawalModal = ({
	isOpen,
	onClose,
	onConfirm,
	isLoading = false,
}: WithdrawalModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-zinc-800 rounded-lg px-6 w-full max-w-md relative py-20">
				<button
					type="button"
					onClick={onClose}
					className="absolute right-4 top-4 text-gray-400 hover:text-white"
				>
					<IoMdClose size={24} />
				</button>

				<p className="text-base mb-8 text-center">정말 탈퇴하시겠습니까?</p>

				<div className="flex justify-center gap-4 text-sm">
					<button
						type="button"
						onClick={onConfirm}
						className="w-24 py-1 bg-pink-600 rounded hover:bg-pink-700 transition-colors"
						disabled={isLoading}
					>
						예
					</button>

					<button
						type="button"
						onClick={onClose}
						className="w-24 py-1 bg-zinc-600 rounded hover:bg-zinc-700 transition-colors"
						disabled={isLoading}
					>
						아니요
					</button>
				</div>
			</div>
		</div>
	);
};

export default WithdrawalModal;
