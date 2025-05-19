import {Link} from 'react-router-dom';
import { useAuth } from "../context/AuthContext.tsx";
import useGetMyInfo from '../hooks/queries/useGetMyInfo.ts';
import useLogout from '../hooks/mutations/useLogout.ts';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const { accessToken } = useAuth();
  const { mutate: logoutMutate } = useLogout();
  const { data } = useGetMyInfo(accessToken);
  const name = data?.data.name;
  const handleLogout = () => logoutMutate();

  return (
    <nav className={`bg-white dark:bg-black shadow-md fixed w-full z-[999] transition-all duration-300 ${sidebarOpen ? "pl-56" : "pl-1"} pr-5`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {!sidebarOpen && (
            <img
              src="/openSidebar.png"
              className="w-6 h-6 mr-2 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            />
          )}
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            <span className="text-white ml-8">
              {accessToken ? (name ?? "Who") : "Who"}
            </span>'s LP🎸👨‍🎤
          </Link>
        </div>
        <div className="flex space-x-6 items-center flex-wrap">
          {(!sidebarOpen || window.innerWidth >= 768) && (
            <>
              {!accessToken && (
                <>
                  <Link
                    to={"/login"}
                    className="text-gray-700 dark:text-gray-300 hover:text-[#FF4E6B] transition"
                  >
                    로그인
                  </Link>
                  <Link
                    to={"/signup"}
                    className="text-gray-700 dark:text-gray-300 hover:text-[#FF4E6B] transition"
                  >
                    회원가입
                  </Link>
                </>
              )}
              {accessToken && (
                <>
                  <Link
                    to={"/my"}
                    className="text-gray-700 dark:text-gray-300 hover:text-[#FF4E6B] transition"
                  >
                    마이 페이지
                  </Link>
                  <a
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-300 hover:text-[#FF4E6B] transition cursor-pointer"
                  >
                    로그아웃
                  </a>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
