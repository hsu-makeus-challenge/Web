import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { useMediaQuery } from 'react-responsive';
import { useSidebar } from "../../context/SidebarContext";
import { useNavigate } from "react-router-dom";
import WidthDraw from "./WidthDraw";


const Sidebar = () => {
    //const { isSidebarOpen, closeSidebar, sidebarRef } = useSidebar();
    const { isSidebarOpen, closeSidebar, sidebarRef, modalRef, isModalOpen, setModalOpen } = useSidebar();

    //const modalRef = useRef<HTMLDivElement>(null);
    //const [modalOpen, setModalOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const navigate = useNavigate();

    const openModal = () => {
        //closeSidebar();
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const isClickOutsideSidebar = sidebarRef.current && !sidebarRef.current.contains(e.target as Node);
            const isClickOutsideModal = modalRef?.current && !modalRef?.current.contains(e.target as Node);

            if (
                isMobile &&
                isSidebarOpen &&
                isClickOutsideSidebar &&
                (!isModalOpen || isClickOutsideModal) // 모달이 열려 있다면, 모달 안쪽 클릭은 예외
            ) {
                closeSidebar();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile, isSidebarOpen, isModalOpen, closeSidebar]);

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
                    <button className="flex flex-row items-center gap-2 cursor-pointer"
                        onClick={() => navigate("/search")} >
                        <FaSearch /> 찾기
                    </button>

                    <button className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => navigate("/mypage")}><IoMdPerson /> 마이페이지</button>

                </div>
                <button className="text-gray-300 text-sm cursor-pointer"
                    onClick={() => openModal()}
                >탈퇴하기</button>

                <WidthDraw
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    modalRef={modalRef}
                />
            </aside>

        </>
    ) : null;
};

export default Sidebar;