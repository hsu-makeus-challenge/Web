import { useForm } from 'react-hook-form';
import { login } from '../apis/auth'; 
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

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
      const response = await login(data); // API 요청, 응답 받아서 로컬 스토리지 저장하기
      if (response.status) {
        
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        console.log('성공~~:', response.data);
        navigate('/'); 
      } else {
        console.error('왜냐하면:', response.message);
      }
    } catch (error) {
      console.error('제발', error);
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