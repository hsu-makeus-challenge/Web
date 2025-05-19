import { postLogout } from "../../apis/auth";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavbarLinks from "./NavbarLinks";
import NavbarAuth from "./NavbarAuth";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";

const Navbar = () => {
  const location = useLocation();
  const { accessToken } = useAuth();
  const { data: myInfo } = useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: getMyInfo,
    enabled: !!accessToken,
  });
  const handleLogout = async () => {
    try {
      await postLogout();
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-16 py-6 bg-black h-24">
      <div className="flex items-center gap-4">
        <img src="/public/spotify_icon.png" alt="Logo" className="w-10 h-10" />
      </div>

      <div className="flex items-center gap-6">
        <NavbarLinks />
        <div className="w-px h-6 bg-gray-600"></div>
        {!accessToken ? (
          <NavbarAuth />
        ) : (
          <div className="flex items-center text-white text-sm">
            {myInfo?.data.name}님 반갑습니다.
            <button
              onClick={handleLogout}
              className="text-white text-sm ml-4 cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
