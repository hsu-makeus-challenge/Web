import { useSignup } from '../../contexts/SignupContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nicknameSchema, type NicknameFormData } from '../../schemas/signup.schema';
import { signup } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AxiosError } from 'axios';

const NicknameStep = () => {
  const { email, password, setNickname, clearSignupData } = useSignup();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: NicknameFormData) => {
    try {
      setNickname(data.nickname);
      setErrorMessage(''); // 에러 메시지 초기화
  
      //API 요청하고 RESPONSE 받아오기
      const response = await signup({
        name: data.nickname,
        email,
        password,
      });
  
      if (response.status) {
        // 회원가입 완료 후 데이터 초기화
        clearSignupData();
        // 로그인 페이지로 이동
        navigate('/login');
      } else {
        setErrorMessage(response.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setErrorMessage('이미 사용 중인 이메일 또는 닉네임입니다.');
      } else {
        setErrorMessage('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
      console.error('회원가입 중 오류 발생:', error);
    }
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
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-lg transition-colors ${
            isValid
              ? 'bg-pink-500 hover:bg-pink-600 cursor-pointer' 
              : 'bg-gray-800 cursor-not-allowed opacity-50'
          }`}
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
};

export default NicknameStep; 