import { FaBasketShopping } from "react-icons/fa6";
import { useCartStore } from "../store/cartStore";

const Header: React.FC = () => {
	const amount = useCartStore((state) => state.amount);

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
