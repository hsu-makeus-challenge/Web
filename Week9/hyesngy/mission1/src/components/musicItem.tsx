import { useDispatch } from "react-redux";
import type { CartItem } from "../types/cart";
import { decrease, increase } from "../store/cartSlice";

const MusicItem: React.FC<CartItem> = ({
	id,
	img,
	title,
	singer,
	price,
	amount,
}) => {
	const dispatch = useDispatch();

	return (
		<div className="w-3xl py-4 justify-between items-center px-8 flex border-b border-gray-200">
			<div className="flex items-center gap-4">
				<img src={img} alt={title} className="w-20 h-20 object-cover rounded" />
				<div className="flex flex-col pr-2">
					<p className="text-sm font-bold line-clamp-2">{title}</p>
					<p className="text-xs text-gray-500">{singer}</p>
					<p className="text-xs text-gray-500">\{price}</p>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => dispatch(decrease(id))}
					className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-bold"
				>
					−
				</button>
				<span className="w-8 text-center">{amount}</span>
				<button
					type="button"
					onClick={() => dispatch(increase(id))}
					className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-bold"
				>
					+
				</button>
			</div>
		</div>
	);
};

export default MusicItem;
