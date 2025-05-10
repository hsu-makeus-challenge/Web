import ListNavBar from "./list-navBar";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleSignUpClick = () => {
        navigate("/signup");
    }

    return (
        <div className="w-full h-[3vw] items-center flex justify-between px-[2vw]">
            <ListNavBar />
            <div className="flex gap-[1vw]">
                <button onClick={handleLoginClick} className="bg-black px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw]">로그인</button>
                <button onClick={handleSignUpClick} className="bg-blue-800 px-[1vw] py-[0.5vw] rounded-[0.6vw] text-white text-[1vw]">회원가입</button>
            </div>
        </div>
    )
}

export default NavBar;