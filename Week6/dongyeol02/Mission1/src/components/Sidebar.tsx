import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { accessToken } = useAuth();
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <aside
      ref={ref}
      className={`
    fixed top-0 left-0 h-full w-40 bg-gray-400 text-gray-900 z-40 transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:static md:translate-x-0 md:block
  `}
    >
      <div className="mt-20">
        <ul className="space-y-4">
          <li className="hover:text-pink-300 cursor-pointer">
            <Link
              to={"/search"}
              className="text-gray-700 dark:text-gray-300 hover:text-pink-300"
            >
              찾기
            </Link>
          </li>
          {accessToken && (
            <li className="hover:text-pink-300 cursor-pointer">
              <Link
                to={"/my"}
                className="text-gray-700 dark:text-gray-300 hover:text-pink-300"
              >
                마이페이지
              </Link>
            </li>
          )}
        </ul>
      </div>
      <button className="text-gray-400 hover:text-red-500 text-sm">
        탈퇴하기
      </button>
    </aside>
  );
};
export default Sidebar;
