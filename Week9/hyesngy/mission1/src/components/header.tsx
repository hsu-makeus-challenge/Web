import { FaBasketShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Header: React.FC = () => {
	const { amount } = useSelector((state: RootState) => state.cart);

	return (
		<div className="w-full h-16 bg-blue-950 fixed top-0 text-white flex justify-between items-center px-8">
			<p className="font-bold text-2xl">Playlist</p>
			<div className="flex items-center justify-between gap-2">
				<FaBasketShopping size={24} />
				<span className="text-s font-bold">{amount}</span>
			</div>
		</div>
	);
};

export default Header;
