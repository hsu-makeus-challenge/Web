import { useMutation } from '@tanstack/react-query';
import { lpPostData } from '../../apis/lpAdd/lpPost';
import { LpAddType } from '../../type/type';

const usePostLpData = () => {
  return useMutation({
    mutationFn: (lpData: LpAddType) => lpPostData({ lpData }),
    onSuccess: (data) => {
      console.log('서버 응답:', data);
    },
  });
};

export default usePostLpData;
