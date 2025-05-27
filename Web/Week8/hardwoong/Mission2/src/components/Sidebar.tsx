import { useEffect, useRef, forwardRef, Ref } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRequestQuit: () => void;
}

const Sidebar = forwardRef(({ sidebarOpen, setSidebarOpen, onRequestQuit }: SidebarProps, ref: Ref<HTMLDivElement>) => {
  const localRef = useRef(null);
  const { accessToken } = useAuth();


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        localRef.current &&
        !(localRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    if (window.innerWidth < 768 && sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {sidebarOpen && window.innerWidth < 768 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[998]" />
      )}
      <div ref={ref}>
        <aside
          ref={localRef}
          className={`bg-[#1C1C1E] text-white w-56 min-h-screen p-6 space-y-4 fixed z-[999] transition-transform transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:block`}
        >
          <div className="flex items-center justify-between">
            <input
              className="w-40 bg-[#2C2C2E] text-white placeholder-gray-400 p-1 rounded mr-1"
              placeholder="검색"
            />
            <img
              src="/closeSidebar.png"
              className="w-5 ml-2 cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="hover:text-pink-400">
              홈
            </Link>
            <Link to="#" className="hover:text-pink-400">
              새로운 음악
            </Link>
            <Link to="#" className="hover:text-pink-400">
              라디오
            </Link>
            <Link to="#" className="hover:text-pink-400">
              최근 추가된 항목
            </Link>
            <Link to="#" className="hover:text-pink-400">
              아티스트
            </Link>
            <Link to="#" className="hover:text-pink-400">
              앨범
            </Link>
            <Link to="#" className="hover:text-pink-400">
              노래
            </Link>
            <div className="border-t border-gray-700 pt-4"></div>
            <Link to="#" className="hover:text-pink-400">
              모든 플레이리스트
            </Link>
            <Link to="#" className="hover:text-pink-400">
              즐겨찾는 노래
            </Link>
            <div className="mt-auto">
              {accessToken && (<button onClick={onRequestQuit} className="hover:text-pink-400 cursor-pointer">
                탈퇴하기
              </button>)}
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
});

export default Sidebar;