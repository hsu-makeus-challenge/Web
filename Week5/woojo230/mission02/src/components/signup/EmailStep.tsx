import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, EmailFormData } from '../../schemas/signupSchema';

interface EmailStepProps {
  onNext: (email: string) => void;
  validationSchema: typeof emailSchema;
}

const EmailStep = ({ onNext, validationSchema }: EmailStepProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    trigger,
  } = useForm<EmailFormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const email = watch('email');
  const isButtonEnabled = isValid && isDirty && email;

  useEffect(() => {
    if (email) {
      trigger('email');
    }
  }, [email, trigger]);

  const onSubmit = (data: EmailFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNext(data.email);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          이메일
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-lime-500`}
          placeholder="이메일 주소 입력"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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

export default EmailStep;
