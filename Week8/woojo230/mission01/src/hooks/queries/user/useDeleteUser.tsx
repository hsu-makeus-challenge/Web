import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteUser from '../../../apis/auth/deleteUser';

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });
};

export default useDeleteUser;
