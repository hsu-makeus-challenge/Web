import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { accessToken, user, logout } = useAuth();
  const [userState, setUserState] = useState(user);

  useEffect(() => {
    if (accessToken) {
      getMyInfo().then((res: { data: User }) => setUserState(res.data)).catch(() => setUserState(null));
    } else {
      setUserState(null);
    }
  }, [accessToken]);

  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-white shadow">
      {/* 왼쪽 메뉴들 */}
      <div className="flex space-x-4 text-gray-600 font-semibold">
        <Link to="/">홈</Link>
        <Link to="/movies/popular">인기 영화</Link>
        <Link to="/movies/now-playing">상영 중</Link>
        <Link to="/movies/top-rated">평점 높은</Link>
        <Link to="/movies/upcoming">개봉 예정</Link>
      </div>
      {/* 오른쪽: 로그인 시 사용자 이름/로그아웃, 미로그인 시 로그인/회원가입 */}
      {accessToken && userState ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-bold">{userState.name}님 반갑습니다.</span>
          <button onClick={logout} className="bg-red-400 text-white px-4 py-2 rounded hover:opacity-80">로그아웃</button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <Link
            to="/login"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:opacity-80"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80"
          >
            회원가입
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
