import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../utils/validate';

const LoginPage = () => {
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: '',
        password: '',
      },
      validate: validateSignin,
    });
  const handleSubmit = () => {
    console.log(values);
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === '');

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

        <Link
          to="/google-login"
          className="text-white border border-white px-4 py-2 w-90 rounded hover:bg-gray-700 mt-10 mb-10 text-center"
        >
          구글 로그인
        </Link>
        <div className="flex items-center mb-4 w-90 relative">
          <hr className="flex-grow border-t border-white" />
          <span className="mx-2 bg-gray-800 px-2 text-white">OR</span>
          <hr className="flex-grow border-t border-white" />
        </div>
        <form className="p-6 rounded shadow-md w-96">
          <div className="mb-4">
            <input
              {...getInputProps('email')}
              type="email"
              name="email"
              className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
                ${
                  errors?.email && touched?.email
                    ? 'border-red-400'
                    : ' border-gray-300'
                }`}
              placeholder="이메일"
              autoComplete="current-email"
            />
          </div>
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <div className="mb-4">
            <input
              {...getInputProps('password')}
              type="password"
              id="password"
              className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
                ${
                  errors?.password && touched?.password
                    ? 'border-red-400'
                    : ' border-gray-300'
                }`}
              placeholder="비밀번호"
              autoComplete="current-password"
            />
          </div>
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          <button
            type="button"
            className="w-full bg-green-500 hover:bg-green-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
