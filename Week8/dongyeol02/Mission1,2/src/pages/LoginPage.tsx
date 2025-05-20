import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useLogin from "../hooks/mutation/useLogin";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth(); // accessToken 저장 함수 필요
  const { mutate: loginMutate } = useLogin();

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const handleSubmit = () => {
    loginMutate(values, {
      onSuccess: () => {
        navigate("/"); // 성공 시 이동만 하면 됨
      },
      onError: () => {
        alert("로그인 실패");
      },
    });
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          type="email"
          placeholder="이메일"
          className="border p-2 rounded w-[300px]"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          type="password"
          placeholder="비밀번호"
          className="border p-2 rounded w-[300px]"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
        >
          로그인
        </button>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          구글 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
