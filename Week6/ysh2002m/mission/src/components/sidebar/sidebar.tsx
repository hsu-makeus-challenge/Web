import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="w-[175px] min-h-screen bg-neutral-900 flex flex-col gap-4 px-4 py-6 shrink-0 select-none">
      <div className="flex items-center gap-2 text-white opacity-50 pointer-events-none">
        <FaSearch />
        <Link to="/" className="text-sm">찾기</Link>
      </div>
      <div className="flex items-center gap-2 text-white opacity-50 pointer-events-none">
        <BiSolidMoviePlay />
        <Link to="/" className="text-sm">마이페이지</Link>
      </div>
    </div>
  );
};

export default Sidebar;
