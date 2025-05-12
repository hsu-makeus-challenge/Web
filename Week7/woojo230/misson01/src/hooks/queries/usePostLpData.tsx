import { useMutation, useQueryClient } from '@tanstack/react-query';
import { lpPostData } from '../../apis/lpAdd/lpPost';
import { LpAddType } from '../../type/type';

const usePostLpData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lpData: LpAddType) => lpPostData({ lpData }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['lp'] });
      console.log('서버 응답:', data);
    },
  });
};

export default usePostLpData;
