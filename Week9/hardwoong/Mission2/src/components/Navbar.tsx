import type { JSX } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from '../hooks/useCustomRedux';
import type { RootState } from '../store/store';
import type { CartState } from '../slices/cartSlice';
import { useEffect } from 'react';
import { useDispatch } from '../hooks/useCustomRedux';
import { calculateTotals } from '../slices/cartSlice';

const Navbar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { amount, cartItems } = useSelector((state: RootState): CartState => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

  return (
    <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <h1 onClick={() => 
        window.location.href = '/'
      } className='text-2xl font-semibold cursor-pointer'>INGOSA</h1>
      <div className='flex items-center space-x-2'>
        <FaShoppingCart className='text-2xl' />
        <span className='text-xl font-medium'>{amount}</span>
      </div>
    </div>
  )
}

export default Navbar