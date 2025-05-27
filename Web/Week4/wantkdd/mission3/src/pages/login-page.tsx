import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, SigninFormFields } from '../utils/validate';
import { postSignin } from '../apis/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import googleLogo from '../assets/googleLogo.svg';
import axios from 'axios';

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SigninFormFields>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SigninFormFields) => {
    try {
      const response = await postSignin(data);
      console.log(response);
      if (response.data && response.data.accessToken) {
        setItem(response.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          alert('로그인 중 오류가 발생했습니다.');
        }
      }
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
        <div className="flex items-center w-90 mb-4">
          <Link to="/" className="flex text-white text-2xl">
            &lt;
          </Link>
          <span className="text-4xl font-bold text-white flex-grow text-center">
            로그인
          </span>
        </div>

        <img
          src={googleLogo}
          alt="Google Login"
          className="cursor-pointer w-90 h-25 p-5 mb-5"
          onClick={() => {}}
        />
        <div className="flex items-center mb-4 w-90 relative">
          <hr className="flex-grow border-t border-white" />
          <span className="mx-2 bg-gray-800 px-2 text-white">OR</span>
          <hr className="flex-grow border-t border-white" />
        </div>
        <form
          className="p-6 rounded shadow-md w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <input
              {...register('email')}
              type="email"
              className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
                ${errors?.email ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="이메일"
              autoComplete="current-email"
            />
            {errors?.email && (
              <div className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register('password')}
              type="password"
              className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
                ${errors?.password ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="비밀번호"
              autoComplete="current-password"
            />
            {errors?.password && (
              <div className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300"
            disabled={!isDirty || !isValid}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
