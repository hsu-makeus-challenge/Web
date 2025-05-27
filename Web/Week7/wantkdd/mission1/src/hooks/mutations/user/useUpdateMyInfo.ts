import { useMutation } from '@tanstack/react-query';
import { patchUserInfo } from '../../../apis/auth';
import { queryClient } from '../../../App';
import { QUERY_KEY } from '../../../constants/key';
import { PatchUserInfoDto } from '../../../types/auth';

function useUpdateUserInfo() {
  return useMutation({
    mutationFn: (body: PatchUserInfoDto) => patchUserInfo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default useUpdateUserInfo;
