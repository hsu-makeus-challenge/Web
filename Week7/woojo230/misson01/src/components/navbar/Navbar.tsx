import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../stores/login';
import {
  useLocalStorage,
  useSessionStorage,
} from '../../hooks/useLocalStorage';
import { FaBars } from 'react-icons/fa';
import useSideBarStore from '../../stores/sideBar';
import { useEffect } from 'react';
import useGetUserBasicInfo from '../../hooks/queries/user/useGetUserBasicInfo';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLogin, setLogin } = useLoginStore();
  const { remove: localRemove } = useLocalStorage();
  const { remove: sessionRemove } = useSessionStorage();
  const { toggleSidebar } = useSideBarStore();

  const { data: userData } = useGetUserBasicInfo();
  const nickname = userData?.data?.name || localStorage.getItem('name') || '';

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isLogin) {
      setLogin(true);
    } else if (!accessToken && isLogin) {
      setLogin(false);
    }
  }, [isLogin, setLogin]);

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
    setLogin(false);
    navigate('/login');
  };

  return (
    <nav className="flex gap-4 place-content-between bg-lime-500">
      <div className="flex gap-4 items-center bg-white-900 text-white p-4">
        <FaBars
          className="text-2xl text-lime-800 cursor-pointer"
          onClick={toggleSidebar}
        />
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
