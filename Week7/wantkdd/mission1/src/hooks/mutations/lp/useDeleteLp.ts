import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLp } from '../../../apis/lp';
import { QUERY_KEY } from '../../../constants/key';
import { useNavigate } from 'react-router-dom';

export const useDeleteLp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (lpId: number) => deleteLp(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });

      navigate('/');
    },
  });
};
