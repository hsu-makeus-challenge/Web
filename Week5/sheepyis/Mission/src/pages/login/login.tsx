import { useNavigate } from "react-router-dom";
import GoogleButton from "../../components/login/googleButton";
import LoginForm from "../../components/login/loginForm";

const Login = () => {
    const navigate = useNavigate();

    const handleBeforeClick = () => {
        navigate(-1);
    }

    return (
        <div className="w-full min-h-screen bg-blue-950 flex flex-col items-center">
            <div className="w-[25vw] relative my-[5vw] text-white flex flex-col gap-[2vw]">
                <div className="relative flex items-center justify-center h-[3vw]">
                    <button type="button" onClick={handleBeforeClick} className="absolute left-0 text-[1.2vw] px-[1vw] font-bold">{"<"}</button>
                    <p className="text-[1.2vw] font-bold">로그인</p>
                </div>

                <GoogleButton />

                <div className="w-full flex justify-between items-center">
                    <hr className="bg-white w-[35%] h-[0.1vw]" />
                    <p className="text-[1vw] font-bold">OR</p>
                    <hr className="bg-white w-[35%] h-[0.1vw]" />
                </div>

                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
