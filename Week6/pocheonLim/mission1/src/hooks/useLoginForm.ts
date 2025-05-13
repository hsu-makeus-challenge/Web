import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../apis/auth';
import type { LoginFormData } from '../schemas/login.schema';
import { useAuth } from '../contexts/AuthContext';

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const emailRegister = register('email', {
    required: true,
    pattern: {
      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      message: '올바른 이메일 형식을 입력해주세요.',
    },
  });

  const passwordRegister = register('password', {
    required: true,
    minLength: {
      value: 8,
      message: '비밀번호는 8자 이상이어야 합니다.',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      if (response.status) {
        // AuthContext의 login 함수 호출
        authLogin(response.data.accessToken, response.data.refreshToken);
        console.log('로그인 성공');
        navigate('/');
      } else {
        console.error('로그인 실패:', response.message);
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  return {
    emailRegister,
    passwordRegister,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
  };
}; 