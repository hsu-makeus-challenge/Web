import { useSignup } from '../../contexts/SignupContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema, type PasswordFormData } from '../../schemas/signup.schema';
import { useState } from 'react';

const PasswordStep = () => {
  const { setPassword, setStep } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: PasswordFormData) => {
    setPassword(data.password);
    setStep(3);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        <div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요!"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <span className="material-icons">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <input
              type={showPasswordConfirm ? 'text' : 'password'}
              placeholder="비밀번호를 다시 입력해주세요!"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
              {...register('passwordConfirm')}
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <span className="material-icons">
                {showPasswordConfirm ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
          {errors.passwordConfirm && (
            <p className="mt-2 text-sm text-red-500">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>
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
        다음
      </button>
    </form>
  );
};

export default PasswordStep; 