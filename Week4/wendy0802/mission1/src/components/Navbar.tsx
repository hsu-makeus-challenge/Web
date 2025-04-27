import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-white shadow">
      {/* 왼쪽 메뉴들 */}
      <div className="flex space-x-4 text-gray-600 font-semibold">
        <Link to="/">홈</Link>
        <Link to="/popular">인기 영화</Link>
        <Link to="/now-playing">상영 중</Link>
        <Link to="/top-rated">평점 높은</Link>
        <Link to="/upcoming">개봉 예정</Link>
      </div>

      {/* 오른쪽 버튼들 */}
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
    </nav>
  );
};

export default Navbar;
