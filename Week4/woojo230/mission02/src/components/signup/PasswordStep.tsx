// components/PasswordStep.tsx

import useForm from '../../hooks/useForm';
import { validatePasswordOnly } from '../../utils/validate';

type Props = {
  email: string;
};

type PasswordOnly = {
  password: string;
  confirm: string;
};

const PasswordStep = ({ email }: Props) => {
  const { errors, touched, getInputProps, isValid } = useForm<PasswordOnly>({
    initialValue: {
      password: '',
      confirm: '',
    },
    validate: (values) => {
      const passwordErrors = validatePasswordOnly({
        password: values.password,
      });

      const errors: Record<keyof PasswordOnly, string> = {
        password: passwordErrors.password,
        confirm: '',
      };

      if (values.password !== values.confirm) {
        errors.confirm = '비밀번호가 일치하지 않습니다.';
      }

      return errors;
    },
  });

  const handleSubmit = () => {
    const password = getInputProps('password').value;
    if (isValid) {
      console.log('회원가입 최종 제출:', { email, password });
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-black text-sm font-medium">📧 {email}</div>

      <div>
        <input
          {...getInputProps('password')}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
        )}
      </div>

      <div>
        <input
          {...getInputProps('confirm')}
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해주세요!"
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        />
        {errors?.confirm && touched?.confirm && (
          <div className="text-red-500 text-sm mt-1">{errors.confirm}</div>
        )}
      </div>

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

export default PasswordStep;
