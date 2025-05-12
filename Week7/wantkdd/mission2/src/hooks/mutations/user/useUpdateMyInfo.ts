import { useMutation } from '@tanstack/react-query';
import { patchUserInfo } from '../../../apis/auth';
import { queryClient } from '../../../App';
import { QUERY_KEY } from '../../../constants/key';
import { PatchUserInfoDto, ResponseMyInfoDto } from '../../../types/auth';
import { useAuth } from '../../../context/AuthContext';

function useUpdateUserInfo() {
  const { setUserInfo } = useAuth();

  return useMutation({
    mutationFn: (body: PatchUserInfoDto) => patchUserInfo(body),

    onMutate: async (newUserData: PatchUserInfoDto) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      const previousUserInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      if (previousUserInfo) {
        queryClient.setQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo], {
          ...previousUserInfo,
          data: {
            ...previousUserInfo.data,
            name: newUserData.name,
            bio: newUserData.bio || previousUserInfo.data.bio,
            avatar: newUserData.avatar || previousUserInfo.data.avatar,
          },
        });

        setUserInfo({
          ...previousUserInfo.data,
          name: newUserData.name,
          bio: newUserData.bio || previousUserInfo.data.bio,
          avatar: newUserData.avatar || previousUserInfo.data.avatar,
        });
      }

      return { previousUserInfo };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default useUpdateUserInfo;
