import React from 'react';
import { CartIcon } from '../constant/icons';
import { useCartStore } from '../store/store';

const Navbar: React.FC = () => {
  const cartItems = useCartStore(state => state.cartItems);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex justify-between items-center py-2.5 px-5 bg-[#6c63ff] text-white">
      <h1 className="text-2xl font-bold">UMC PlayList</h1>
      <div className="flex items-center relative">
        <CartIcon />
        <span className="ml-2 text-base font-bold bg-white text-[#6c63ff] rounded-full w-6 h-6 flex items-center justify-center">
          {totalQuantity}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
