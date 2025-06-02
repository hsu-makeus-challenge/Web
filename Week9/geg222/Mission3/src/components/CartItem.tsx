import { useCartActions } from "../hooks/useCartStore";
import type { Lp } from "../types/cart";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartActions();
  const handleIncreaseCount = () => {
    increase(lp.id);
  };
  const handleDecreaseCount = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
      return;
    }
    decrease(lp.id);
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-100 bg-white rounded-md">
      <img
        src={lp.img}
        alt={"${lp.title}의 lp 이미지"}
        className="w-20 h-20 object-cover rounded-lg mr-4"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900">{lp.title}</h3>
        <p className="text-sm text-gray-500">{lp.singer}</p>
        <p className="text-sm font-medium text-gray-800">{lp.price} 원</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecreaseCount}
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition cursor-pointer"
        >
          -
        </button>
        <span className="px-4 py-[3px] border border-gray-300 text-sm text-gray-700">
          {lp.amount}
        </span>
        <button
          onClick={handleIncreaseCount}
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
