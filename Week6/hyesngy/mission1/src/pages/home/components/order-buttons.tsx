import type { OrderType } from "@typedefs/lp";

interface OrderButtonsProps {
	currentOrder: OrderType;
	onOrderChange: (order: OrderType) => void;
}

const OrderButtons = ({ currentOrder, onOrderChange }: OrderButtonsProps) => {
	return (
		<div className="flex flex-row self-end">
			<button
				type="button"
				className={`px-3 py-1 rounded-l-md rounded-r-none border border-gray-100 cursor-pointer ${
					currentOrder === "asc"
						? "bg-gray-100 text-black hover:bg-gray-200"
						: "hover:bg-stone-950 border-gray-100"
				}`}
				onClick={() => onOrderChange("asc")}
			>
				오래된순
			</button>
			<button
				type="button"
				className={`px-3 py-1 rounded-r-md rounded-l-none border border-gray-100 cursor-pointer ${
					currentOrder === "desc"
						? "bg-gray-100 text-black hover:bg-gray-200"
						: "hover:bg-stone-950"
				}`}
				onClick={() => onOrderChange("desc")}
			>
				최신순
			</button>
		</div>
	);
};

export default OrderButtons;
