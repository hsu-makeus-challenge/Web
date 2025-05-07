import { FaSearch, FaUser } from 'react-icons/fa';
import useSideBarStore from '../../stores/sideBar';

const SideBar = () => {
  const { isSidebarOpen } = useSideBarStore();
  // console.log(isSidebarOpen);

  return (
    <div className="h-full w-50 bg-lime-500 shadow-lg p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 cursor-pointer text-lime-900 hover:text-lime-700">
        <FaSearch size={16} />
        <span className="text-lg font-semibold cursor-pointer">찾기</span>
      </div>
      <div className="flex items-center gap-2 cursor-pointer text-lime-900 hover:text-lime-700">
        <FaUser size={16} />
        <span className="text-lg font-semibold cursor-pointer">마이페이지</span>
      </div>
    </div>
  );
};

export default SideBar;
