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
  return (
    <nav className="flex gap-4 bg-white-900 text-black p-4">
      <div onClick={gotoHome} className="cursor-pointer hover:text-lime-500">
        홈
      </div>
      <div onClick={gotoPopular} className="cursor-pointer hover:text-lime-500">
        인기영화
      </div>
      <div
        onClick={gotoNowPlaying}
        className="cursor-pointer hover:text-lime-500"
      >
        상영 중
      </div>
      <div
        onClick={gotoTopRated}
        className="cursor-pointer hover:text-lime-500"
      >
        평점 높은
      </div>
      <div
        onClick={gotoUpComing}
        className="cursor-pointer hover:text-lime-500"
      >
        개봉예정
      </div>
    </nav>
  );
};

export default Navbar;
