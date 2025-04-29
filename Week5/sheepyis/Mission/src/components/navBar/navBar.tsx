import ListNavBar from "./list-navBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loginStatus);
    }, []);

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleSignUpClick = () => {
        navigate("/signup");
    };

    const handleMypageClick = () => {
        navigate("/mypage");
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('로그아웃 되었습니다.');
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="w-full h-[3vw] items-center flex justify-between px-[2vw]">
            <ListNavBar />
            <div className="flex gap-[1vw]">
                {isLoggedIn ? (
                    <>
                        <button onClick={handleLogoutClick} className="bg-red-600 px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw]">
                            로그아웃
                        </button>
                        <button onClick={handleMypageClick} className="bg-black px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw]">
                            마이페이지
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleLoginClick} className="bg-black px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw]">
                            로그인
                        </button>
                        <button onClick={handleSignUpClick} className="bg-blue-800 px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw]">
                            회원가입
                        </button>
                    </>
                )}
            </div>
        </div>
    )
};

export default NavBar;
