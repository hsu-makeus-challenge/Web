import { useDispatch } from "react-redux";
import MusicList from "../components/musicList";
import Modal from "../components/modal";
import { openModal } from "../store/modalSlice";

const PlaylistPage = () => {
	const dispatch = useDispatch();

	const handleClearCartClick = () => {
		dispatch(openModal());
	};

	return (
		<div className="w-full flex flex-col items-center p-20 gap-10">
			<MusicList />
			<button
				type="button"
				onClick={handleClearCartClick}
				className="px-4 py-2 rounded hover:bg-gray-100 border"
			>
				전체 삭제
			</button>

			<Modal />
		</div>
	);
};

export default PlaylistPage;
