import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, PasswordFormData } from '../../schemas/signupSchema';

interface PasswordStepProps {
  onNext: (password: string) => void;
  email: string;
  validationSchema: typeof signUpSchema;
}

const PasswordStep = ({
  onNext,
  email,
  validationSchema,
}: PasswordStepProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    trigger,
    watch,
  } = useForm<PasswordFormData & { confirmPassword: string }>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const isButtonEnabled = isValid && isDirty && password && confirmPassword;

  useEffect(() => {
    if (password && confirmPassword) {
      trigger();
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit = (data: PasswordFormData & { confirmPassword: string }) => {
    setIsLoading(true);
    console.log('Signing up with:', { email, password: data.password });

    setTimeout(() => {
      setIsLoading(false);
      onNext(data.password);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <p className="text-gray-600 text-lg">
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        ></label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-lime-500`}
            placeholder="비밀번호를 입력하세요"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '숨기기' : '보기'}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        ></label>
        <div className="relative">
          <input
            {...register('confirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-lime-500`}
            placeholder="비밀번호를 다시 입력하세요"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? '숨기기' : '보기'}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !isButtonEnabled}
        className={`w-full font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-colors ${
          isButtonEnabled
            ? 'bg-lime-600 hover:bg-lime-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isLoading ? '처리 중...' : '다음'}
      </button>
    </form>
  );
};

export default PasswordStep;
