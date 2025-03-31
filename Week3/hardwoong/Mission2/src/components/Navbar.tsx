import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로

  const isActive = (path: string) => location.pathname === path;
  // 현재 경로와 path가 같으면 true, 아니면 false

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 shadow-md bg-white flex gap-6">
      <button
        onClick={() => navigate('/')}
        className={`${isActive('/') ? 'text-green-600' : 'text-gray-600 hover:text-green-500'}`}
      >
        홈
      </button>
      <button
        onClick={() => navigate('/movies/popular')}
        className={`${isActive('/movies/popular') ? 'text-green-600' : 'text-gray-600 hover:text-green-500'}`}
      >
        인기 영화
      </button>
      <button
        onClick={() => navigate('/movies/now-playing')}
        className={`${isActive('/movies/now-playing') ? 'text-green-600' : 'text-gray-600 hover:text-green-500'}`}
      >
        상영 중
      </button>
      <button
        onClick={() => navigate('/movies/top-rated')}
        className={`${isActive('/movies/top-rated') ? 'text-green-600' : 'text-gray-600 hover:text-green-500'}`}
      >
        평점 높은
      </button>
      <button
        onClick={() => navigate('/movies/upcoming')}
        className={`${isActive('/movies/upcoming') ? 'text-green-600' : 'text-gray-600 hover:text-green-500'}`}
      >
        개봉 예정
      </button>
    </nav>
  );
};

export default Navbar;