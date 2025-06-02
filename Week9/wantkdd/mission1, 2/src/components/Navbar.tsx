import { useEffect } from 'react';
import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { calculateTotals } from '../slices/cartSlice';

const Navbar = () => {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);
  return (
    <nav className="bg-gray-700 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1
            onClick={() => (window.location.href = '/')}
            className="text-pink-500 text-2xl font-bold cursor-pointer"
          >
            WAN PLAYLIST
          </h1>
        </div>

        <div className="flex items-center">
          <span>🛒</span>
          <span className="text-2xl font-medium text-white">{amount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
