import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import ArrowButton from '../components/ArrowButton';
import EyeToggleIcon from '../components/EyeToggleIcon';
import useLocalStorage from '../hooks/useLocalStorage';

const emailSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

const nicknameSchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useLocalStorage('signup-email', '');
  const [password, setPassword] = useLocalStorage('signup-password', '');

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isValid: isEmailValid },
  } = useForm({ resolver: zodResolver(emailSchema), mode: 'onChange' });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isValid: isPasswordValid },
  } = useForm({ resolver: zodResolver(passwordSchema), mode: 'onChange' });

  const {
    register: registerNickname,
    handleSubmit: handleSubmitNickname,
    formState: { errors: nicknameErrors, isValid: isNicknameValid },
  } = useForm({ resolver: zodResolver(nicknameSchema), mode: 'onChange' });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmitEmail = ({ email }: { email: string }) => {
    setEmail(email);
    setStep(2);
  };

  const onSubmitPassword = ({ password }: { password: string }) => {
    setPassword(password);
    setStep(3);
  };

  const onSubmitNickname = ({ nickname }: { nickname: string }) => {
    console.log('회원가입 완료', { email, password, nickname });
    localStorage.removeItem('signup-email');
    localStorage.removeItem('signup-password');
    navigate('/');
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative flex justify-center items-center mb-4">
          <h1 className="text-xl font-bold">회원가입</h1>
          <div className="absolute left-0">
            <ArrowButton direction="prev" onClick={() => {
              if (step > 1) setStep(step - 1);
              else navigate(-1);
            }} label="이전" />
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmitEmail(onSubmitEmail)} className="space-y-4">
            <input
              type="email"
              placeholder="이메일을 입력해주세요!"
              {...registerEmail('email')}
              className="w-full border px-3 py-2 rounded text-black"
            />
            {emailErrors.email && (
              <p className="text-red-500 text-sm">{emailErrors.email.message}</p>
            )}
            <button
              type="submit"
              disabled={!isEmailValid}
              className={`w-full py-2 rounded font-semibold transition ${
                isEmailValid ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              다음
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
            <p className="mb-2">📧 {email}</p>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요!"
                {...registerPassword('password')}
                className="w-full border px-3 py-2 rounded text-black"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <EyeToggleIcon visible={showPassword} />
              </button>
            </div>
            {passwordErrors.password && (
              <p className="text-red-500 text-sm">{passwordErrors.password.message}</p>
            )}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 다시 한 번 입력해주세요!"
                {...registerPassword('confirmPassword')}
                className="w-full border px-3 py-2 rounded text-black"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <EyeToggleIcon visible={showConfirmPassword} />
              </button>
            </div>
            {passwordErrors.confirmPassword && (
              <p className="text-red-500 text-sm">{passwordErrors.confirmPassword.message}</p>
            )}
            <button
              type="submit"
              disabled={!isPasswordValid}
              className={`w-full py-2 rounded font-semibold transition ${
                isPasswordValid ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              다음
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmitNickname(onSubmitNickname)} className="space-y-4 text-center">
            <p className="mb-2">📧 {email}</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <input
              type="text"
              placeholder="닉네임을 입력해주세요!"
              {...registerNickname('nickname')}
              className="w-full border px-3 py-2 rounded text-black"
            />
            {nicknameErrors.nickname && (
              <p className="text-red-500 text-sm">{nicknameErrors.nickname.message}</p>
            )}
            <button
              type="submit"
              disabled={!isNicknameValid}
              className={`w-full py-2 rounded font-semibold transition ${
                isNicknameValid ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
