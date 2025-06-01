import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

const Header = () => {
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

    return (
        <div className="w-[100%] h-[4vw] flex items-center p-[1vw] justify-between bg-blue-950 text-white">
            <p className="">Inseo Yang</p>
            <div className="flex items-center gap-[1vw]">
                <FaShoppingCart className="text-xl text-white" />
                <p className="text-xl">{totalQuantity}</p>
            </div>
        </div>
    )
}

export default Header;