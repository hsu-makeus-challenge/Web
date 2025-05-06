import { useSignUpFormStep3 } from "../../../hooks/signUp/useSignUpFormStep3";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import type { Step3Schema } from "../../../utils/signUp/step3Schema";

interface Section3Props {
  onSubmitComplete?: () => void;
}

const Section3 = ({ onSubmitComplete }: Section3Props) => {
  const { register, handleSubmit, formState: { errors, isValid } } = useSignUpFormStep3();
  const [, setName] = useLocalStorage<string>("name", "");

  const onSubmit = (data: Step3Schema) => {
    setName(data.name);
    if (onSubmitComplete) onSubmitComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2vw] items-center">
      <div className="w-[10vw] h-[10vw] rounded-[50%] bg-white" />

      <div className="w-full relative">
        <input
          {...register("name")}
          className="w-full h-[3vw] outline-white outline-[0.1vw] rounded-[0.4vw] text-[1vw] px-[1vw]"
          placeholder="닉네임을 입력해주세요!"
        />
        {errors.name && (
          <p className="text-red-600 text-[0.6vw] font-bold mt-[0.5vw] absolute">
            {errors.name.message}
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
        회원가입 완료
      </button>
    </form>
  );
};

export default Section3;
