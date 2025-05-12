import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../hooks/Auths/useAuths";

const SignOutBtn = () =>{
    const {name} = useAuth();
    const {mutate: logout} = useLogout();
    
    return(

        <section className="flex flex-row items-center">
            <div className="text-sm mr-5">
                {name} 님 반갑습니다.
            </div>
            <button onClick={() => logout()}
            className="cursor-pointer bg-white rounded-md w-[70px] h-[30px] text-sm">로그아웃</button>
        </section>
    )
}

export default SignOutBtn;