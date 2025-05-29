import { FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { useEffect } from 'react';
import { calculateTotals } from '../store/cartslice';
import '../App.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const { totalAmount, totalPrice, items } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  return (
    <nav className="w-full bg-[#23408e] h-16 px-8 flex items-center justify-between fixed top-0 left-0 z-50 shadow-md">
      <span className="text-white font-bold text-xl">PLAYLIST</span>
      <div className="flex items-center gap-3 text-white">
        <span className="font-semibold text-sm sm:text-base">
          TOTAL: ₩{totalPrice.toLocaleString()}
        </span>
        <div className="relative flex items-center gap-1">
          <FaShoppingCart className="text-lg sm:text-xl" />
          <span className="text-sm sm:text-base font-bold">{totalAmount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
