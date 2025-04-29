import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-700 p-4">
      <div className="flex flex-wrap font-bold space-x-10 items-center">
        <Link
          to="/"
          className={`mr-6 ${
            isActive('/') ? 'text-green-300' : 'text-white hover:text-green-300'
          }`}
        >
          WANCINEMA
        </Link>

        <Link
          to="/movies/popular"
          className={`py-2 ${
            isActive('/movies/popular')
              ? 'text-green-300'
              : 'text-white hover:text-green-300'
          }`}
        >
          인기 영화
        </Link>
        <Link
          to="/movies/now_playing"
          className={`py-2 ${
            isActive('/movies/now_playing')
              ? 'text-green-300'
              : 'text-white hover:text-green-300'
          }`}
        >
          상영 중
        </Link>
        <Link
          to="/movies/top-rated"
          className={`py-2 ${
            isActive('/movies/top-rated')
              ? 'text-green-300'
              : 'text-white hover:text-green-300'
          }`}
        >
          평점 높은
        </Link>

        <Link
          to="/movies/upcoming"
          className={`py-2 ${
            isActive('/movies/upcoming')
              ? 'text-green-300'
              : 'text-white hover:text-green-300'
          }`}
        >
          개봉 예정
        </Link>
      </div>
    </nav>
  );
};

export default memo(Navbar);
