import { JSX } from "react"
import { NavLink } from "react-router-dom"

const LINKS = [
  { to: '/', label: '홈' },
  { to: '/movies/popular', label: '인기 영화' },
  { to: '/movies/now_playing', label: '상영 중' },
  { to: '/movies/top_rated', label: '평점 높은' },
  { to: '/movies/upcoming', label: '개봉 예정' },
];

const ACTION_LINKS = [
  { to: '/login', label: '로그인' },
  { to: '/signup', label: '회원가입' },
];

export const Navbar = (): JSX.Element => {
  return (
    <div className="flex justify-between items-center p-4 text-white">
      <div className="flex gap-3">
        {LINKS.map(({ to, label }): JSX.Element => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? 'text-[#b2dab1] font-bold' : 'text-gray-400 hover:text-[#b2dab1]'
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <div className="flex gap-2">
        {ACTION_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-3 py-1 rounded text-sm ${
                isActive
                  ? 'bg-[#b2dab1] text-white'
                  : 'bg-transparent border border-[#2aaa27] text-[#2aaa27] hover:bg-[#2aaa27] hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}