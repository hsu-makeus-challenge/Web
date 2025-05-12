import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { useMediaQuery } from 'react-responsive';
import { useSidebar } from "../../context/SidebarContext";

const Sidebar = () =>{
    const {isSidebarOpen, closeSidebar, sidebarRef} = useSidebar();

    const isMobile = useMediaQuery({ maxWidth: 767 });
    

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isMobile &&
                isSidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node)
            ) {
                closeSidebar();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile, isSidebarOpen, closeSidebar]);

    // 모바일이면 isSidebarOpen에 따라 보여주고, 데스크탑이면 무조건 보이게
    const shouldShow = !isMobile || isSidebarOpen;

    return shouldShow ? (
        <>
            <aside
                ref={sidebarRef}
                className={
                    `top-0 left-0 h-full z-50 bg-cyan-800 text-white py-5 px-5 transition-transform duration-300 
                    ${isMobile ? 'w-40' : 'w-40'} 
                    ${shouldShow ? 'translate-x-0' : '-translate-x-full'}`
                }
            >
                <div className="flex flex-col gap-2">
                    <span className="flex flex-row items-center gap-2 cursor-pointer">
                        <FaSearch /> 찾기
                    </span>
                    <span className="flex flex-row items-center gap-2 cursor-pointer">
                        <IoMdPerson /> 마이페이지
                    </span>
                </div>
                <span className="text-gray-300 text-sm cursor-pointer">탈퇴하기</span>
            </aside>

            
            {/* {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-30"
                    onClick={closeSidebar}
                ></div>
            )} */}
        </>
    ) : null;
};

export default Sidebar;