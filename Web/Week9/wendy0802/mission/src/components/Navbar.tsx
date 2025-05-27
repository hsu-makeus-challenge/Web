import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
    const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
    const totalCount = useSelector((state: RootState) => state.cart.totalCount);

    return (
        <nav className="bg-blue-900 h-16 flex items-center justify-between px-4 fixed w-full top-0 z-50">
            <div>
                <Link to="/" className="text-xl font-bold text-white">
                    PLAYLIST
                </Link>
            </div>
            <div className="flex items-center text-white font-bold text-lg ml-auto">
                <span className="mr-6">
                    TOTAL: ₩{totalAmount.toLocaleString()} 
                </span>
                
                <FaShoppingCart className="mr-1" />
                {totalCount}
            </div>
        </nav>
    );
}