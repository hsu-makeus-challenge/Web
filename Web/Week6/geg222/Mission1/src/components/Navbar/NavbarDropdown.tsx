import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";

const NavbarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const avatarUrl =
    localStorage.getItem("avatarUrl") ||
    "https://www.gravatar.com/avatar/?d=mp";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full overflow-hidden focus:outline-none"
      >
        <img
          src={avatarUrl}
          alt="프로필 이미지"
          className="w-full h-full object-cover"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-neutral-900 text-white rounded-lg shadow-lg z-50">
          <ul className="py-2 px-3 text-sm">
            <li
              className="hover:bg-neutral-800 rounded px-2 py-1 cursor-pointer"
              onClick={() => {
                navigate("/my");
                setIsOpen(false);
              }}
            >
              프로필 관리
            </li>
            <li
              className="hover:bg-neutral-800 rounded px-2 py-1 cursor-pointer"
              onClick={() => {
                navigate("/account");
                setIsOpen(false);
              }}
            >
              계정
            </li>
            <li
              className="hover:bg-neutral-800 rounded px-2 py-1 cursor-pointer"
              onClick={() => {
                navigate("/support");
                setIsOpen(false);
              }}
            >
              고객 센터
            </li>
            <li
              className="hover:bg-neutral-800 rounded px-2 py-1 cursor-pointer text-red-400"
              onClick={handleLogout}
            >
              로그아웃
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
