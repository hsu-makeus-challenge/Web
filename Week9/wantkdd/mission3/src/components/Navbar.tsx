import { useEffect } from 'react';
import { useCartActions, useCartInfo } from '../hooks/useCartStore';

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals, cartItems]);
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
          <span className="text-2xl font-medium text-pink-500">{amount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
