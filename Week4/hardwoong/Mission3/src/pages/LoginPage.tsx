import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ArrowButton from '../components/ArrowButton';

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginForm) => {
    console.log('로그인 데이터:', data);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="relative mb-6">
          <div className="absolute left-0">
            <ArrowButton direction="prev" onClick={() => {navigate(-1);}} label="이전" />
          </div>
          <h1 className="text-2xl font-semibold text-center">로그인</h1>
        </div>

        <button className="w-full border border-black py-2 mb-4 flex items-center justify-center gap-2">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
            className="w-5 h-5"
          />
          구글 로그인
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-sm text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="이메일을 입력해주세요!"
              {...register('email')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              {...register('password')}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-2 rounded font-semibold transition ${
              isValid
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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