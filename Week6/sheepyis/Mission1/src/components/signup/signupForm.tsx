import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section1 from "./section/section1";
import Section2 from "./section/section2";
import Section3 from "./section/section3";
import { AuthAPI } from "../../apis/authAxios";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const SignUpForm = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [email] = useLocalStorage<string>("email", "");
    const [password] = useLocalStorage<string>("password", "");
    const [name] = useLocalStorage<string>("name", "");

    const goToNextStep = () => setStep((prev) => prev + 1);

    const handleBeforeClick = () => {
        navigate(-1);
    };

    const handleSubmitSignUp = async () => {
        const payload = {
            name,
            email,
            password,
            bio: `안녕하세요. 저는 ${name}입니다.`,
            avatar: "https://avatars.githubusercontent.com/u/55682610?v=4",
        };

        try {
            const response = await AuthAPI.post("/auth/signup", payload);
            console.log("회원가입 성공:", response);
            alert("회원가입이 완료되었습니다.");

            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            navigate("/login");
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="w-[25vw] relative my-[5vw] text-white">
            <div className="relative flex items-center justify-center h-[3vw] mb-[1vw]">
                <button
                    type="button"
                    onClick={handleBeforeClick}
                    className="absolute left-0 text-[1.2vw] px-[1vw] font-bold"
                >
                    {"<"}
                </button>
                <p className="text-[1.2vw] font-bold">회원가입</p>
            </div>

            {step === 1 && <Section1 onNext={goToNextStep} />}
            {step === 2 && <Section2 onNext={goToNextStep} />}
            {step === 3 && <Section3 onSubmitComplete={handleSubmitSignUp} />}
        </div>
    );
};

export default SignUpForm;
