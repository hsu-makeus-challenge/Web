import { Link, Links, NavLink } from 'react-router-dom';

const LINKS = [
    {to: '/', label: '홈'},
    {to: '/Movies/popular' , label: '인기 영화'},
    {to: '/Movies/now_playing' , label: '상영 중'},
    {to: '/Movies/top_rated' , label: '평점 높은'},
    {to: '/Movies/upcoming' , label: '개봉 예정'},

]


export const Navbar = (): JSX.Element => {
    return (
      <div className="flex gap-3 p-4">
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }): string =>
              isActive ? 'text-[#4682b4] font-bold' : 'text-gray-500'
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    );
  };