import { useState, useEffect, useRef } from "react";
import { useUserStore } from "../constants/userStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();
  console.log("Sidebar user:", user);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger & Home Icon Container */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2 lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="text-white bg-zinc-900 p-2 rounded text-xl"
        >
          ≡
        </button>
        {/* Home icon could go here if needed */}
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" />}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-[#121212] text-white flex flex-col justify-between min-h-screen p-4 rounded-xl shadow-md fixed top-0 left-0 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`}
      >
        {/* 상단 라이브러리 및 카드 */}
        <div>
          <h1 className="text-xl font-bold mb-6">
            {user?.nickname
              ? `${user.nickname}님의 라이브러리`
              : "내 라이브러리"}
          </h1>

          <div className="bg-zinc-900 rounded-lg p-4 mb-4">
            <p className="font-bold text-lg mb-1">
              첫 번째 플레이리스트를 만드세요.
            </p>
            <p className="text-sm text-gray-300 mb-4">
              어렵지 않아요. 저희가 도와드릴게요.
            </p>
            <button className="bg-white text-black font-semibold rounded-full px-4 py-2 text-sm">
              플레이리스트 만들기
            </button>
          </div>

          <div className="bg-zinc-900 rounded-lg p-4">
            <p className="font-bold text-lg mb-1">
              팔로우할 팟캐스트를 찾아보세요
            </p>
            <p className="text-sm text-gray-300 mb-4">
              새로운 에피소드에 대한 소식을 알려드릴게요.
            </p>
            <button className="bg-white text-black font-semibold rounded-full px-4 py-2 text-sm">
              팟캐스트 둘러보기
            </button>
          </div>
        </div>

        {/* 하단 링크 및 언어 선택 */}
        {user === null && (
          <div className="text-xs text-gray-400 mt-2 space-y-1">
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              <span>법률 정보</span>
              <span>안전 및 개인정보 보호 센터</span>
              <span>개인정보 처리방침</span>
              <span>광고 상세정보</span>
            </div>
            <div>접근성</div>
            <div>쿠키</div>
            <button className="border border-white rounded-full px-4 py-1 mt-4 flex items-center gap-1 text-white">
              🌐 한국어
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
