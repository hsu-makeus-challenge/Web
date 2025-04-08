import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

const NavSign = () =>{
    const navigate = useNavigate();


    return(
        <section className="">
            <button onClick={() => navigate('/login')}
            className="mr-5 cursor-pointer bg-white rounded-md w-[70px] h-[30px] text-sm">로그인</button>
            <button onClick={() => navigate('/signup')}
            className="cursor-pointer bg-pink-100 rounded-md w-[70px] h-[30px] text-sm">회원가입</button>
        </section>
    )
}

export default NavSign;