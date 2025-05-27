import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../hooks/Auths/useAuths";
import { useMypageStore } from "../../stores/MypageStore";

const SignOutBtn = () =>{
    
    const {mutate: logout} = useLogout();
    const userInfo = useMypageStore((state) => state.userInfo);
    const name = userInfo?.data?.name ?? "사용자";
    
    return(

        <section className="flex flex-row items-center">
            <div className="text-sm mr-5">
                {name ? `${name} 님 반갑습니다.` : "로딩 중..."}
            </div>
            <button onClick={() => logout()}
            className="cursor-pointer bg-white rounded-md w-[70px] h-[30px] text-sm">로그아웃</button>
        </section>
    )
}

export default SignOutBtn;