import GoogleButton from "../../login/googleButton";
import { useSignUpFormStep1 } from "../../../hooks/signUp/useSignUpFormStep1";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import type { Step1Schema } from "../../../utils/signUp/step1Schema";

interface Section1Props {
    onNext: () => void;
}

const Section1 = ({ onNext }: Section1Props) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useSignUpFormStep1();
    const [, setEmail] = useLocalStorage<string>("email", "");

    const onSubmit = (data: Step1Schema) => {
        setEmail(data.email);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2vw]">
            <GoogleButton />

            <div className="w-full flex justify-between items-center">
                <hr className="bg-white w-[35%] h-[0.1vw]" />
                <p className="text-[1vw] font-bold">OR</p>
                <hr className="bg-white w-[35%] h-[0.1vw]" />
            </div>

            <div className="w-full relative">
                <input
                    {...register("email")}
                    className="w-full h-[3vw] outline-white outline-[0.1vw] rounded-[0.4vw] text-[1vw] px-[1vw]"
                    placeholder="이메일을 입력해주세요!"
                />
                {errors.email && (
                    <p className="text-red-600 text-[0.6vw] font-bold mt-[0.5vw] absolute">
                        {errors.email.message}
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

export default Section1;
