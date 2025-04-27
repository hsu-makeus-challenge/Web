import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const gotoHome = (): void => {
    navigate('/');
  };

  const gotoNowPlaying = (): void => {
    navigate('/movies/now-playing');
  };

  const gotoPopular = (): void => {
    navigate('/movies/popular');
  };

  const gotoTopRated = (): void => {
    navigate('/movies/top-rated');
  };

  const gotoUpComing = (): void => {
    navigate('/movies/up-coming');
  };

  const gotoLogin = (): void => {
    navigate('/login');
  };

  const gotoSignUp = (): void => {
    navigate('/signUp');
  };

  return (
    <nav className="flex gap-4 place-content-between bg-lime-500">
      <div className="flex gap-4 items-center bg-white-900 text-white p-4">
        <div onClick={gotoHome} className="cursor-pointer hover:text-lime-700">
          홈
        </div>
        <div
          onClick={gotoPopular}
          className="cursor-pointer hover:text-lime-700"
        >
          인기영화
        </div>
        <div
          onClick={gotoNowPlaying}
          className="cursor-pointer hover:text-lime-700"
        >
          상영 중
        </div>
        <div
          onClick={gotoTopRated}
          className="cursor-pointer hover:text-lime-700"
        >
          평점 높은
        </div>
        <div
          onClick={gotoUpComing}
          className="cursor-pointer hover:text-lime-700"
        >
          개봉예정
        </div>
      </div>
      <div className="flex gap-4 text-white p-4">
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
      </div>
    </nav>
  );
};

export default Navbar;
