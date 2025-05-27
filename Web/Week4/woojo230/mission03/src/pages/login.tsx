import useForm from '../hooks/useForm';
import GoogleLoginButton from '../utils/googleLoginBtn';
import { UserSigninInformation, validateSignin } from '../utils/validate';
import axios from '../apis/auth/axios';
import { useLocalStorage, useSessionStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { set: setLocal } = useLocalStorage();
  const { set: setSession } = useSessionStorage();

  const { errors, touched, getInputProps, isValid } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: '',
        password: '',
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    if (!isValid) return;

    const email = getInputProps('email').value;
    const password = getInputProps('password').value;

    try {
      const response = await axios.post('/v1/auth/signin', {
        email,
        password,
      });

      console.log('로그인 성공:', response.data);

      setLocal('accessToken', response.data.accessToken);
      setSession('refreshToken', response.data.refreshToken);

      navigate('/home');
    } catch (error: any) {
      console.error('로그인 에러:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 md:p-10 rounded-2xl w-[350px] md:w-[400px] border-2 border-lime-700">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 relative">
          로그인
        </h2>

        <GoogleLoginButton />

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-gray-300 flex-grow"></div>
          <div className="mx-4 text-sm font-medium text-gray-500">OR</div>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <div className="space-y-5">
          <div>
            <input
              {...getInputProps('email')}
              type="email"
              placeholder="이메일"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent shadow-sm transition duration-200"
            />
            {errors?.email && touched?.email && (
              <div className="text-red-600 text-sm mt-1 ml-1">
                {errors.email}
              </div>
            )}
          </div>

          <div>
            <input
              {...getInputProps('password')}
              type="password"
              placeholder="비밀번호"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent shadow-sm transition duration-200"
            />
            {errors?.password && touched?.password && (
              <div className="text-red-600 text-sm mt-1 ml-1">
                {errors.password}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full font-medium py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg cursor-pointer
                ${
                  isValid
                    ? 'bg-lime-500 hover:bg-lime-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
