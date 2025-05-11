import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../stores/login';
import {
  useLocalStorage,
  useSessionStorage,
} from '../../hooks/useLocalStorage';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLogin, toggleLogin } = useLoginStore();
  const nickname = localStorage.getItem('name');
  const { remove: localRemove } = useLocalStorage();
  const { remove: sessionRemove } = useSessionStorage();

  const gotoHome = (): void => {
    navigate('/');
  };

  const gotoLogin = (): void => {
    navigate('/login');
  };

  const gotoSignUp = (): void => {
    navigate('/signUp');
  };

  const handleLogout = () => {
    localRemove('name');
    localRemove('accessToken');
    sessionRemove('refreshToken');
    toggleLogin();
    navigate('/login');
  };

  return (
    <nav className="flex gap-4 place-content-between bg-lime-500">
      <div className="flex gap-4 items-center bg-white-900 text-white p-4">
        <div
          className="font-bold text-2xl text-lime-800 cursor-pointer"
          onClick={gotoHome}
        >
          LIMELP🍋‍🟩
        </div>
      </div>
      <div className="flex gap-4 text-white p-4">
        {isLogin ? (
          <>
            <p className="flex items-center font-bold">
              {nickname}님 반갑습니다
            </p>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-lime-600 border border-lime-500 rounded-lg  hover:bg-lime-700 hover:border-lime-700 transition duration-200 cursor-pointer"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={gotoLogin}
              className="px-3 py-1 bg-lime-600 border border-lime-500 rounded-lg  hover:bg-lime-700 hover:border-lime-700 transition duration-200 cursor-pointer"
            >
              로그인
            </button>
            <button
              onClick={gotoSignUp}
              className="px-3 py-1 bg-lime-600 border border-lime-500 rounded-lg  hover:bg-lime-700 hover:border-lime-700 transition duration-200 cursor-pointer"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
