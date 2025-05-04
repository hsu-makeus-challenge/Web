import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <Link to="/" className="text-xl font-bold text-pink-500">
          돌려돌려LP판
        </Link>
        <div className="flex gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white">
            로그인
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-pink-500 rounded-md hover:bg-pink-600">
            회원가입
          </Link>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout; 