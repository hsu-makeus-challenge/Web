import { useMutation } from '@tanstack/react-query';
import { SigninFormFields } from '../../../utils/validate';
import { useAuth } from '../../../context/AuthContext';

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: SigninFormFields) => {
      return login(data);
    },
  });
};
