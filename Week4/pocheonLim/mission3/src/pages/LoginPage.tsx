import { Link } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';

const LoginPage = () => {
  const {
    emailRegister,
    passwordRegister,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
  } = useLoginForm();

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="relative flex justify-center mb-8">
          <Link to="/" className="absolute left-0 text-gray-400 hover:text-white text-2xl">
            {'<'}
          </Link>
          <h1 className="text-2xl font-semibold">로그인</h1>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-900 transition-colors">
          <img src="/google-icon.png" alt="Google" className="w-6 h-6" />
          <span>구글 로그인</span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">OR</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="이메일을 입력해주세요!"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
              {...emailRegister}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
              {...passwordRegister}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-lg transition-colors ${
              isValid
                ? 'bg-pink-500 hover:bg-pink-600 cursor-pointer' 
                : 'bg-gray-800 cursor-not-allowed opacity-50'
            }`}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 