import Navbar from "../components/Navbar";
import Playlist from "./Playlist";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-100 pt-16 flex flex-col items-center">
            <Navbar />
            <Playlist />
        </div>
    );
}

