import { FaShoppingCart } from "react-icons/fa";
import type { RootState } from '../../app/store'
import { useSelector } from "react-redux";


const Navbar = () => {
    const cart = useSelector((state: RootState) => 
        state.cart.items.reduce((sum, item) => sum + item.amount, 0)
    );


    return (
        <nav className="fix top-0 bg-blue-900 text-white flex items-center justify-between w-full h-[50px]">
            <div className="text-[20px] font-bold ml-3">JOY-PLAYLIST</div>
            <div className="flex flex-row items-center gap-2 mr-10"><FaShoppingCart className="text-[20px]"/>{cart}개</div>
        </nav>
    );
}

export default Navbar;