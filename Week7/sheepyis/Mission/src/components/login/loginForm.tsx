import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthLoginMutation } from "../../hooks/\bauth/useAuthLoginMutation";
import { errorMessages } from "../../utils/login/errorMessages";
import { validationRules } from "../../utils/login/validationRules";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { Login } from "../../types/login";

const LoginForm = () => {
  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage("accessToken", "");
  const [, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [, setName] = useLocalStorage("name", "");
  const [, setUserId] = useLocalStorage("userId", "");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Login>({
    mode: "onChange",
  });

  const { mutate: login, isPending } = useAuthLoginMutation();

  const onSubmit = (data: Login) => {
    login(data, {
      onSuccess: (response) => {
        const { accessToken, refreshToken, name, id } = response.data;

        if (accessToken && refreshToken && name && id) {
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setName(name);
          setUserId(id);

          alert("로그인에 성공하셨습니다.");
          navigate("/");
          window.location.reload();
        } else {
          alert("로그인 응답에 필요한 데이터가 없습니다.");
          console.error("응답 오류:", response);
        }
      },
      onError: (error) => {
        alert("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
        console.error("로그인 에러:", error);
      },
    });
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
        <input
          type="password"
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

      <button
        type="submit"
        disabled={!isValid || isPending}
        className={`w-full h-[3vw] text-[1vw] font-bold rounded-[0.4vw] mt-[1vw] transition-colors duration-200 ${
          isValid && !isPending
            ? "bg-blue-600 text-white cursor-pointer"
            : "bg-gray-400 text-gray-300 cursor-not-allowed"
        }`}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
};

export default LoginForm;
