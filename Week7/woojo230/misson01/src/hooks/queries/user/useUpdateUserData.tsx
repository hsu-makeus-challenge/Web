import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserDataUpdateType } from '../../../type/type';
import userDataUpdate from '../../../apis/user/userDataUpdate';

const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: UserDataUpdateType) => userDataUpdate({ userData }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      alert('회원정보가 수정되었습니다.');
      console.log('서버 응답:', data);
    },
    onError: (error) => {
      alert('회원정보 수정 실패');
      console.error('회원정보 수정 실패:', error);
    },
  });
};

export default useUpdateUserData;
