import type { JSX } from "react";
import CartItem from './CartItem';
import type { RootState } from '../store/store';
import type { CartState } from '../slices/cartSlice';
import { useSelector } from 'react-redux';

const CartList = (): JSX.Element => {
  const { cartItems } = useSelector((state: RootState): CartState => state.cart);

  return (
    <div className='flex flex-col items-center justify-center'>
      <ul>
        {cartItems.map((item): JSX.Element => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  )
}

export default CartList