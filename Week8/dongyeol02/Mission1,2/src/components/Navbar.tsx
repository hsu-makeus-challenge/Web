import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/mutation/useLogout";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";
import { QUERY_KEY } from "../constants/key";

interface NavbarProps {
  onSidebarToggle: () => void;
}

const Navbar = ({ onSidebarToggle }: NavbarProps) => {
  const { accessToken } = useAuth();
  const { mutate: logoutMutate } = useLogout();

  const { data: userInfo } = useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken,
  });
  const handleLogout = async () => {
    logoutMutate();
  };
  return (
    <nav className="bg-gray-100 dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-500"
            onClick={onSidebarToggle}
          >
            ☰
          </button>
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            돌려돌려 돌림판
          </Link>
        </div>

        <div className="space-x-6">
          {!accessToken ? (
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
          ) : (
            <>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {userInfo?.data.name}님
              </span>
              <Link
                to={"/my"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500"
              >
                로그아웃
              </button>
            </>
          )}
          <Link
            to={"/search"}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            검색페이지
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
