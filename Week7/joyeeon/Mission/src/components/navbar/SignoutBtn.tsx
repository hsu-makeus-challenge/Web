import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignOutBtn = () =>{
    const {name, logout} = useAuth();
    const navigate = useNavigate();
    return(

        <section className="flex flex-row items-center">
            <div className="text-sm mr-5">
                {name} 님 반갑습니다.
            </div>
            <button onClick={() => navigate('/')}
            className="cursor-pointer bg-white rounded-md w-[70px] h-[30px] text-sm">로그아웃</button>
        </section>
    )
}

export default SignOutBtn;