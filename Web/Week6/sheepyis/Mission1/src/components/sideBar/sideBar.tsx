import { useNavigate } from "react-router-dom";

type SideBarProps = {
    isOpen: boolean;
};

const SideBar = ({ isOpen }: SideBarProps) => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate("/search")
    }

    const handleMyPageClick = () => {
        navigate("/mypage")
    }

    return (
        <div className={`bg-gray-800 justify-center w-[20vw] h-full 
            ${isOpen ? "flex" : "hidden"} md:flex`}>
            <div className="w-[80%] py-[2vw] flex flex-col justify-between text-[1.5vw]">
                <div className="flex flex-col gap-[1vw]">
                    <p className="cursor-pointer" onClick={handleSearchClick}>찾기</p>
                    <p className="cursor-pointer" onClick={handleMyPageClick}>마이페이지</p>
                </div>
                <p className="cursor-pointer">탈퇴하기</p>
            </div>
        </div>
    )
}

export default SideBar;