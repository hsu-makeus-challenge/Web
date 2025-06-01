import { FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '../../store/useCartStore';

const Header = () => {
    const totalQuantity = useCartStore((state) => state.totalQuantity);

    return (
        <div className="w-[100%] h-[4vw] flex items-center p-[1vw] justify-between bg-blue-950 text-white">
            <p className="text-xl">Inseo Yang</p>
            <div className="flex items-center gap-[1vw]">
                <FaShoppingCart className="text-xl text-white" />
                <p className="text-xl">{totalQuantity}</p>
            </div>
        </div>
    );
};

export default Header;
