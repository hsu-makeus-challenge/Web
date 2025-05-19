import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  {
    to: "/",
    label: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l9-9 9 9v9a3 3 0 01-3 3h-4a3 3 0 01-3-3H6a3 3 0 01-3-3v-9z"
        />
      </svg>
    ),
  },
  { to: "/premium", label: "Premium" },
  { to: "/support", label: "지원" },
];

const NavbarLinks = () => {
  return (
    <div className="flex items-center gap-6">
      {NAV_LINKS.slice(0, 1).map((link) => (
        <NavLink key={link.to} to={link.to} className="transition">
          <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700">
            {link.label}
          </div>
        </NavLink>
      ))}
      <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2 hover:ring-2 hover:ring-white hover:shadow-lg transition ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110 2.5a7.5 7.5 0 016.65 14.15z"
          />
        </svg>
        <input
          type="text"
          placeholder="어떤 콘텐츠를 감상하고 싶으세요?"
          className="bg-transparent outline-none text-white placeholder-gray-400 text-lg w-80"
        />
      </div>
      {NAV_LINKS.slice(1).map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className="text-white hover:text-green-500 text-lg font-medium transition"
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavbarLinks;
