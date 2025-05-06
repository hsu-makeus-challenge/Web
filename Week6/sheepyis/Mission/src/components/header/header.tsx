import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars } from 'react-icons/fa';

type HeaderProps = {
    toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProps) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const localName = localStorage.getItem('name');
        setIsLoggedIn(!!token);
        if (localName) {
            setName(localName);
        }
    }, []);

    const handleHomeClick = () => {
        navigate("/");
    }

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleSignUpClick = () => {
        navigate("/signup");
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('로그아웃 되었습니다.');
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="w-full h-[3vw] items-center flex justify-between px-[2vw] bg-gray-800 text-white">
            <div className="flex items-center gap-[2vw]">
                <FaBars className="w-[1.5vw] cursor-pointer" onClick={toggleSidebar} />
                <p className="text-pink-400 text-[1.5vw] font-bold cursor-pointer" onClick={handleHomeClick}>돌려돌려LP판</p>
            </div>
            <div className="flex gap-[1vw]">
                {isLoggedIn ? (
                    <div className="flex items-center gap-[1vw]">
                        <p className="text-[1vw]">{name}님 반갑습니다.</p>
                        <button onClick={handleLogoutClick} className="bg-red-600 px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw] cursor-pointer">
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-[1vw]">
                        <button onClick={handleLoginClick} className="bg-black px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw] cursor-pointer">
                            로그인
                        </button>
                        <button onClick={handleSignUpClick} className="bg-blue-800 px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw] cursor-pointer">
                            회원가입
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Header;
