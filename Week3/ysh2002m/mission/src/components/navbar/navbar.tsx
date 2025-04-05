import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkStyle = (path: string) =>
    isActive(path)
      ? "text-pink-400 font-bold"
      : "text-white hover:text-pink-300";

  return (
    <nav className="w-full bg-black py-2 px-5 flex items-center space-x-5 text-sm select-none">
      <Link to="/" className={linkStyle("/")}>홈</Link>
      <Link to="/movies/popular" className={linkStyle("/movies/popular")}>인기 영화</Link>
      <Link to="/movies/now-playing" className={linkStyle("/movies/now-playing")}>상영 중</Link>
      <Link to="/movies/top-rated" className={linkStyle("/movies/top-rated")}>평점 높은</Link>
      <Link to="/movies/upcoming" className={linkStyle("/movies/upcoming")}>개봉 예정</Link>
    </nav>
  );
};

export default Navbar;
