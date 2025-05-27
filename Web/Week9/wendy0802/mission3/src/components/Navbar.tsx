import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { usePlayListStore } from "../store/playListStore";

export default function Navbar() {
    const songs = usePlayListStore((state) => state.songs);
    const totalAmount = songs.reduce((sum, song) => sum + song.price, 0);
    const totalCount = songs.length;

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