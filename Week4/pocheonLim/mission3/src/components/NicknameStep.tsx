import { useSignup } from '../contexts/SignupContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nicknameSchema, type NicknameFormData } from '../schemas/signup.schema';

const NicknameStep = () => {
  const { setNickname, setStep } = useSignup();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: NicknameFormData) => {
    setNickname(data.nickname);
    // 회원가입 완료 단계로 이동
    setStep(4);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="material-icons text-4xl text-gray-400">person</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요!"
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500"
            {...register('nickname')}
          />
          {errors.nickname && (
            <p className="mt-2 text-sm text-red-500">{errors.nickname.message}</p>
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
    </div>
  );
};

export default NicknameStep; 