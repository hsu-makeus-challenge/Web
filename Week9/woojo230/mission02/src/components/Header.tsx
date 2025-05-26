import { FaShoppingCart } from 'react-icons/fa';
import useCartStore from '../store/cart/cartStore';

const Header = () => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  return (
    <header className="flex bg-lime-700 justify-between items-center p-4">
      <h1 className="text-2xl font-bold">A him dle da</h1>
      <div className="flex items-center gap-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-white">{totalAmount}</span>
      </div>
    </header>
  );
};

export default Header;
