import { useSignup } from '../contexts/SignupContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, type EmailFormData } from '../schemas/signup.schema';

const EmailStep = () => {
  const { setEmail, setStep } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: EmailFormData) => {
    setEmail(data.email);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="이메일을 입력해주세요!"
          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
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
        다음
      </button>
    </form>
  );
};

export default EmailStep; 