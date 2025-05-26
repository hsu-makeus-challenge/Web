import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Header = () => {
  const { totalAmount } = useSelector((state: RootState) => state.cart);
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
