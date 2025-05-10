import { useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useSignUpFormStep2 } from "../../../hooks/signUp/useSignUpFormStep2";
import { Step2Schema } from "../../../utils/signUp/step2Schema";

interface Section2Props {
    onNext: () => void;
}

const Section2 = ({ onNext }: Section2Props) => {
    const [email] = useLocalStorage<string>("email", "");
    const [, setPassword] = useLocalStorage<string>("password", "");

    const { register, handleSubmit, formState: { errors, isValid } } = useSignUpFormStep2();

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);

    const onSubmit = (data: Step2Schema) => {
        setPassword(data.password);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2vw]">
            <p className="text-[1vw] font-bold">💌: {email}</p>

            <div className="w-full relative">
                <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full h-[3vw] pr-[4vw] outline-white outline-[0.1vw] rounded-[0.4vw] text-[1vw] px-[1vw]"
                    placeholder="비밀번호를 입력해주세요!"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-[1vw] top-1/2 -translate-y-1/2 text-[0.9vw] text-white"
                >
                    {showPassword ? "숨기기" : "보기"}
                </button>
                {errors.password && (
                    <p className="text-red-600 text-[0.6vw] font-bold mt-[0.5vw] absolute">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className="w-full relative">
                <input
                    type={showPasswordCheck ? "text" : "password"}
                    {...register("passwordCheck")}
                    className="w-full h-[3vw] pr-[4vw] outline-white outline-[0.1vw] rounded-[0.4vw] text-[1vw] px-[1vw]"
                    placeholder="비밀번호를 다시 한 번 입력해주세요!"
                />
                <button
                    type="button"
                    onClick={() => setShowPasswordCheck((prev) => !prev)}
                    className="absolute right-[1vw] top-1/2 -translate-y-1/2 text-[0.9vw] text-white"
                >
                    {showPasswordCheck ? "숨기기" : "보기"}
                </button>
                {errors.passwordCheck && (
                    <p className="text-red-600 text-[0.6vw] font-bold mt-[0.5vw] absolute">
                        {errors.passwordCheck.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={!isValid}
                className={`w-full h-[3vw] text-[1vw] font-bold rounded-[0.4vw] mt-[1vw] transition-colors duration-200 ${
                    isValid ? "bg-blue-600 cursor-pointer" : "bg-gray-500 cursor-not-allowed"
                } text-white`}
            >
                다음
            </button>
        </form>
    );
};

export default Section2;
