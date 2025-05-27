import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddLpModal from "../modal/add-lp-modal";

const AddLpButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button
				type="button"
				onClick={openModal}
				className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-red-800 flex items-center justify-center shadow-lg hover:bg-red-900 transition-colors z-10"
				title="Add LP"
			>
				<FaPlus className="text-white text-xl" />
			</button>

			<AddLpModal isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
};

export default AddLpButton;
