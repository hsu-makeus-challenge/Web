import { useLoginForm } from "../../hooks/useLoginForm";
import { errorMessages } from "../../utils/login/errorMessages";
import { AuthAPI } from "../../apis/authAxios";
import type { Login } from "../../types/login";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, errors, isValid, validationRules } = useLoginForm();
    
    const onSubmit = async (data: Login) => {
        try {
            const response = await AuthAPI.post("/auth/signin", data);

            const { accessToken, refreshToken } = response.data.data;

            if (accessToken && refreshToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            } else {
                console.error("서버 응답에 토큰이 없습니다:", response.data);
            }

            alert("로그인에 성공하셨습니다.");
            console.log("서버 응답:", response.data);
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("에러:", error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-[2vw]">
            <div className="w-full relative">
                <input
                    {...register("email", {
                        required: validationRules.email.required,
                        pattern: validationRules.email.pattern,
                    })}
                    className="w-full h-[3vw] outline-white outline-[0.1vw] rounded-[0.4vw] text-[1vw] px-[1vw]"
                    placeholder="이메일을 입력해주세요!"
                />
                {errors.email && (
                    <p className="text-red-600 text-[0.6vw] font-bold mt-[0.5vw] absolute">
                        {errorMessages.email[errors.email.type as string]}
                    </p>
                )}
            </div>

            <div className="w-full relative">
                <input type="password"
                    {...register("password", {
                        required: validationRules.password.required,
                        minLength: validationRules.password.minLength,
                    })}
                    className="w-full h-[3vw] outline-white outline-[0.1vw] rounded-[0.4vw] text-[1vw] px-[1vw]"
                    placeholder="비밀번호를 입력해주세요!"
                />
                {errors.password && (
                    <p className="text-red-600 text-[0.6vw] font-bold mt-[0.5vw] absolute">
                        {errorMessages.password[errors.password.type as string]}
                    </p>
                )}
            </div>

            <button type="submit" 
                className={`w-full h-[3vw] text-[1vw] font-bold rounded-[0.4vw] mt-[1vw] transition-colors duration-200 ${
                    isValid
                    ? "bg-blue-600 text-white cursor-pointer"
                    : "bg-gray-400 text-gray-300 cursor-not-allowed"
                }`}
            >
                로그인
            </button>

        </form>
    );
};

export default LoginForm;
