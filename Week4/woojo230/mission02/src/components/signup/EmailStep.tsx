// components/EmailStep.tsx

import useForm from '../../hooks/useForm';
import { validateEmailOnly } from '../../utils/validate';

type Props = {
  onNext: (email: string) => void;
};

type EmailOnly = {
  email: string;
};

const EmailStep = ({ onNext }: Props) => {
  const { errors, touched, getInputProps, isValid } = useForm<EmailOnly>({
    initialValue: { email: '' },
    validate: validateEmailOnly,
  });

  const handleSubmit = () => {
    const email = getInputProps('email').value;
    if (isValid) onNext(email);
  };

  return (
    <div className="space-y-5">
      <input
        {...getInputProps('email')}
        type="email"
        placeholder="이메일"
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />
      {errors?.email && touched?.email && (
        <div className="text-red-600 text-sm ml-1">{errors.email}</div>
      )}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className={`w-full py-3 rounded-lg font-medium transition ${
          isValid ? 'bg-lime-500 text-white' : 'bg-gray-300 text-gray-500'
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default EmailStep;
