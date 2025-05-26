import MusicItem from "./musicItem";
import { useCartStore } from "../store/cartStore";

const MusicList = () => {
	const cartItems = useCartStore((state) => state.cartItems);

	if (cartItems.length === 0) {
		return (
			<div className="w-full max-w-2xl p-12 text-center">
				<h3 className="text-lg font-bold mb-2 ">
					플레이리스트가 비어있습니다.
				</h3>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			{cartItems.map((item) => (
				<MusicItem key={item.id} {...item} />
			))}
		</div>
	);
};

export default MusicList;
