import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../apis/auth';
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

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await axiosInstance.post('/v1/auth/signin', data);
      return response.data;
    },
    onSuccess: async (response) => {
      if (response.status) {
        await authLogin(response.data.accessToken, response.data.refreshToken);
        navigate('/');
      }
    },
    onError: (error) => {
      console.error('로그인 중 오류 발생:', error);
    },
  });

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
    loginMutation.mutate(data);
  };

  return {
    emailRegister,
    passwordRegister,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    isPending: loginMutation.isPending,
  };
}; 