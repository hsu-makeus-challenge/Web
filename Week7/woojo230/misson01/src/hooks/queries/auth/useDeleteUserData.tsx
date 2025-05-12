import { useMutation, useQueryClient } from '@tanstack/react-query';
import signOut from '../../../apis/auth/signOut';

const useDeleteUserData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return signOut();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useDeleteUserData;
