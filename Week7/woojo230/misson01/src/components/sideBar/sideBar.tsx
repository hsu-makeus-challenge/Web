import { FaSearch, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SignOutModal from '../modal/signOut/signOutModal';
import useSignOutStore from '../../stores/signOut';
const SideBar = () => {
  const navigate = useNavigate();

  const { isSignOutModalOpen, toggleSignOutModal } = useSignOutStore();

  const gotoMypage = () => {
    navigate('/home/mypage');
  };

  return (
    <>
      <div className="h-full w-50 bg-lime-500 shadow-lg p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 cursor-pointer text-lime-900 hover:text-lime-700">
          <FaSearch size={16} />
          <span className="text-lg font-semibold cursor-pointer">찾기</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer text-lime-900 hover:text-lime-700">
          <FaUser size={16} />
          <span
            className="text-lg font-semibold cursor-pointer"
            onClick={gotoMypage}
          >
            마이페이지
          </span>
        </div>
        <div className="flex-grow" />
        <div
          className="fixed bottom-4 left-0 w-100 flex items-center cursor-pointer text-lime-900 hover:text-lime-700 px-10 mb-2"
          style={{ zIndex: 50 }}
        >
          <span
            className="text-lg font-semibold cursor-pointer"
            onClick={toggleSignOutModal}
          >
            탈퇴하기
          </span>
        </div>
      </div>
      {isSignOutModalOpen && <SignOutModal />}
    </>
  );
};

export default SideBar;
