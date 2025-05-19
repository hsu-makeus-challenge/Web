import useForm from '../hooks/useForm.ts';
import { UserSigninInformation, validateSignin } from '../utils/validate.ts';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import ArrowButton from '../components/ArrowButton.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import GoogleLoginButton from '../components/Login/GoogleLoginButton.tsx';
import EmailInput from "../components/Login/EmailInput.tsx";
import PasswordInput from "../components/Login/PasswordInput.tsx";
import useLogin from '../hooks/mutations/useLogin.ts';

const LoginPage = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const loginMutation = useLogin();

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

  const handleSubmit = async () => {
    loginMutation.mutate(values);
  }

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

        <GoogleLoginButton />

        <div className="flex items-center my-2">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        <EmailInput
          value={values.email}
          onChange={getInputProps("email").onChange}
          onBlur={getInputProps("email").onBlur}
          error={errors?.email}
          touched={touched?.email}
        />

        <PasswordInput
          value={values.password}
          onChange={getInputProps("password").onChange}
          onBlur={getInputProps("password").onBlur}
          error={errors?.password}
          touched={touched?.password}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full h-[40px] px-4 rounded font-semibold transition ${
            isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#FF4E6B] text-white hover:bg-[#FF0436]"
          }`}
        >
          로그인
        </button>
      </div>
    </div>
  )
}

export default LoginPage;