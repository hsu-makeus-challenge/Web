import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import WithdrawConfirmModal from "./withdrawConfirmModal";
import { deleteMe } from "../apis/auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { accessToken, logout } = useAuth();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

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
    <>
      <aside
        ref={ref}
        className={`
          fixed top-0 left-0 h-full w-40 bg-gray-400 text-gray-900 z-40 
          transition-transform duration-300 flex flex-col justify-between
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:block
        `}
      >
        {/* 상단 메뉴 */}
        <div className="mt-20 px-4">
          <ul className="space-y-4">
            <li className="hover:text-pink-300 cursor-pointer">
              <Link
                to="/search"
                className="text-gray-700 dark:text-gray-300 hover:text-pink-300"
              >
                찾기
              </Link>
            </li>
            {accessToken && (
              <li className="hover:text-pink-300 cursor-pointer">
                <Link
                  to="/my"
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-300"
                >
                  마이페이지
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* 하단 탈퇴 버튼 */}
        <div className="p-4">
          <button
            className="text-gray-900 hover:text-red-500"
            onClick={() => setShowWithdrawModal(true)}
          >
            탈퇴하기
          </button>
        </div>
      </aside>

      {/* 탈퇴 확인 모달 */}
      {showWithdrawModal && (
        <WithdrawConfirmModal
          onConfirm={async () => {
            try {
              await deleteMe();
              logout();
              alert("회원 탈퇴가 완료되었습니다.");
            } catch (err) {
              alert("회원 탈퇴에 실패했습니다.");
            } finally {
              setShowWithdrawModal(false);
            }
          }}
          onCancel={() => setShowWithdrawModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
