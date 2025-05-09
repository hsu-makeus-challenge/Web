import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useMyInfo from "../hooks/useMyInfo";

interface NavbarProps {
  onSidebarToggle: () => void;
}

const Navbar = ({ onSidebarToggle }: NavbarProps) => {
  const { accessToken, logout } = useAuth();
  const nagivate = useNavigate();
  //const { data } = useMyInfo();
  console.log(accessToken);

  const handleLogout = async () => {
    await logout();
    nagivate("/");
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 shadow-md fixed w-full z-50 ">
      <div className="flex items-center justify-between p-4">
        <div className=" space-x-3">
          <button
            className="py-2 text-gray-700 rounded-md text-base font-medium cursor-pointer"
            onClick={onSidebarToggle}
          >
            사이드바
          </button>
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            돌려돌려 돌림판
          </Link>
        </div>
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to={"/login"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </Link>
              <Link
                to={"/signup"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <>
              {/*<span>{data?.name}님 반갑습니다</span>*/}
              <button
                className="py-2 text-gray-700 rounded-md text-base font-medium cursor-pointer"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
