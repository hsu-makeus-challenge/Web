import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserSigninInformation } from '../../../utils/validate';
import postLogin from '../../../apis/auth/signIn';
import { useLocalStorage, useSessionStorage } from '../../useLocalStorage';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../../stores/login';

const usePostLogin = () => {
  const queryClient = useQueryClient();
  const { set: setLocal } = useLocalStorage();
  const { set: setSession } = useSessionStorage();
  const navigate = useNavigate();
  const { toggleLogin } = useLoginStore();

  return useMutation({
    mutationFn: (userData: UserSigninInformation) => postLogin(userData),
    onSuccess: (data) => {
      // console.log('로그인 응답:', data);

      setLocal('accessToken', data.data.accessToken);
      setLocal('userId', data.data.id);
      setSession('refreshToken', data.data.refreshToken);
      setLocal('name', data.data.name);
      toggleLogin();

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['userBasicInfo'] });
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });

      navigate('/home');
    },
    onError: (error) => {
      console.error('로그인 에러:', error);
    },
  });
};

export default usePostLogin;
