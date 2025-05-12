import { useState } from "react";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import useAppNavigate from "../hooks/useAppNavigate";

const LoginPage = () => {
  const { showPassword, setShowPassword } = useState(false);
  const { showPasswordCheck, setShowPasswordCheck } = useState(false);
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  const handleSubmit = () => {
    console.log(values);
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  const navigate = useAppNavigate();

  const handleGoogleLogin = () => {
    navigate("/googlelogin");
  };
  const handleHomePage = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="w-[300px] relative h-[40px] flex items-center justify-center">
        <button
          className="absolute left-0 text-xl cursor-pointer"
          onClick={handleHomePage}
        >
          &lt;
        </button>
        <span className="text-xl font-semibold">로그인</span>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium cursor-pointer"
        >
          구글로그인
        </button>
        <div className="flex items-center w-full">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <input
          {...getInputProps("email")}
          name="email"
          type={"email"}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          placeholder={"이메일"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 tsxt-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          type={"password"}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          placeholder={"비밀번호"}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
