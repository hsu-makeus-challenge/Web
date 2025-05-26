import { useEffect } from "react";
import MusicItem from "./musicItem";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "../store/cartSlice";

const MusicList = () => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state: RootState) => state.cart);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		dispatch(calculateTotals());
	}, [cartItems, dispatch]);

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
