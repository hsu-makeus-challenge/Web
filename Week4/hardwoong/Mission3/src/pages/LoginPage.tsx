import { postSignin } from '../apis/auth';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import useForm from '../hooks/useForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserSigninInformation, validateSignin } from '../utils/validate';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import EyeToggleIcon from '../components/EyeToggleIcon';
import ArrowButton from '../components/ArrowButton';

const LoginPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, touched, errors, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      navigate('/');
    } catch (error) {
      alert(error);
    }
  }

  const isDisabled: boolean =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <div className="w-full max-w-md px-4">
        <div className="relative flex justify-center items-center mb-4">
          <h1 className="text-xl font-bold text-black">로그인</h1>
          <div className="absolute left-0">
            <ArrowButton
              direction="prev"
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else navigate(-1);
              }}
              label="이전"
            />
          </div>
        </div>

        <button className="w-full border rounded px-4 py-2 flex items-center justify-center mb-2 text-black">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-2" />
          구글 로그인
        </button>

        <div className="flex items-center my-2">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        <div className="flex flex-col gap-3">
          <input
            {...getInputProps("email")}
            name="email"
            className={`border w-full p-[10px] focus:border-[#807bff] rounded-sm text-black
              ${touched?.email && errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type="email"
            placeholder="이메일"
          />
          {(touched?.email && errors?.email) && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <div className="relative w-full">
            <input
              {...getInputProps("password")}
              name="password"
              className={`border p-[10px] focus:border-[#807bff] rounded-sm text-black w-full
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
          {(touched?.password && errors?.password) && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}

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
    </div>
  )
}

export default LoginPage;