import useForm from '../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../utils/validate';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import EyeToggleIcon from '../components/EyeToggleIcon';
import ArrowButton from '../components/ArrowButton';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  
  const [step, setStep] = useState(1);
  const { values, touched, errors, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    await login(values);
  }

  const handleGoogleLogin = () => {
    window.location.href = 
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled: boolean =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <div className="absolute left-10 top-10">
            <ArrowButton
              direction="prev"
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else navigate(-1);
              }}
              label="BACK"
            />
          </div>
      <div className="w-full max-w-md px-4">
        <div className="relative flex justify-center items-center mb-4">
          <h1 className="text-xl font-bold">로그인</h1>
        </div>

        <button 
          type='button'
          onClick={handleGoogleLogin}
          className="w-full border border-white rounded px-4 py-2 flex items-center justify-center mb-2 text-white cursor-pointer"
        >
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-2" />
          구글 로그인
        </button>

        <div className="flex items-center my-2">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        <div className="flex flex-col">
          <input
            {...getInputProps("email")}
            name="email"
            className={`border w-full p-[10px] focus:border-[#807bff] rounded-sm text-white bg-[#2C2C2E]
              ${touched?.email && errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type="email"
            placeholder="이메일"
          />
          <div className="w-full h-5 mt-1.5 mb-1.5">
          {(touched?.email && errors?.email) && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
          </div>
        </div>

          <div className="relative w-full">
            <input
              {...getInputProps("password")}
              name="password"
              className={`border p-[10px] focus:border-[#807bff] rounded-sm text-white bg-[#2C2C2E] w-full
                ${touched?.password && errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black"
            >
              <EyeToggleIcon visible={showPassword} />
            </button>
          </div>
          <div className="w-full h-5 mt-1.5 mb-1.5">
          {(touched?.password && errors?.password) && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`w-full h-[40px] px-4 rounded font-semibold transition ${
              isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#80ed99] text-white hover:bg-[#57c378]"
            }`}
          >
            로그인
          </button>
        </div>
      </div>
  )
}

export default LoginPage;