import CartItem from "./CartItem";
import { useSelector } from "../hooks/useCustomRedux";
import type { CartState } from "../slices/cartSlice";

const CartList = () => {
  const { cartItems, amount, total } = useSelector(
    (state): CartState => state.cart
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
