import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const isActive = (path: string) => location.pathname === path;

  const linkStyle = (path: string) =>
    isActive(path)
      ? "text-pink-400 font-bold"
      : "text-white hover:text-pink-300";

  return (
    <nav className="w-full bg-zinc-900 py-2 px-5 flex justify-between items-center text-sm select-none">
      <div className="flex space-x-5 items-center">
        {isAuthPage ? (
          <span className="text-pink-500 font-bold text-lg">돌려돌려LP판</span>
        ) : (
          <>
            <Link to="/" className={linkStyle("/")}>홈</Link>
            <Link to="/movies/popular" className={linkStyle("/movies/popular")}>인기 영화</Link>
            <Link to="/movies/now-playing" className={linkStyle("/movies/now-playing")}>상영 중</Link>
            <Link to="/movies/top-rated" className={linkStyle("/movies/top-rated")}>평점 높은</Link>
            <Link to="/movies/upcoming" className={linkStyle("/movies/upcoming")}>개봉 예정</Link>
          </>
        )}
      </div>

      <div className="flex space-x-2">
        <Link to="/login" className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 text-white">로그인</Link>
        <Link to="/signup" className="bg-pink-500 px-3 py-1 rounded hover:bg-pink-600 text-white">회원가입</Link>
      </div>
    </nav>
  );
};

export default Navbar;
