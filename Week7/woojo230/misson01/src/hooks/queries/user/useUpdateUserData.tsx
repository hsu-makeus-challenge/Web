import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserDataUpdateType } from '../../../type/type';
import userDataUpdate from '../../../apis/user/userDataUpdate';

interface UserDataResponse {
  data: {
    id: number;
    name: string;
    bio: string;
    avatar: string;
    email: string;
  };
}

const useUpdateUserData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserDataUpdateType) => userDataUpdate({ userData }),

    onMutate: async (newUserData) => {
      await queryClient.cancelQueries({ queryKey: ['userData'] });
      await queryClient.cancelQueries({ queryKey: ['userBasicInfo'] });

      const previousUserData = queryClient.getQueryData<UserDataResponse>([
        'userData',
      ]);

      if (previousUserData) {
        queryClient.setQueryData<UserDataResponse>(['userData'], {
          ...previousUserData,
          data: {
            ...previousUserData.data,
            name: newUserData.name,
            bio: newUserData.bio,
            avatar: newUserData.avatar,
          },
        });

        const userBasicInfo = queryClient.getQueryData<UserDataResponse>([
          'userBasicInfo',
        ]);
        if (userBasicInfo) {
          queryClient.setQueryData<UserDataResponse>(['userBasicInfo'], {
            ...userBasicInfo,
            data: {
              ...userBasicInfo.data,
              name: newUserData.name,
            },
          });
        }
      }

      return { previousUserData };
    },

    onError: (error, variables, context) => {
      if (context?.previousUserData) {
        queryClient.setQueryData(['userData'], context.previousUserData);
        queryClient.invalidateQueries({ queryKey: ['userBasicInfo'] });
      }

      alert('회원정보 수정 실패');
      console.error('회원정보 수정 실패:', error);
    },

    onSuccess: (data) => {
      console.log('서버 응답:', data);
      alert('회원정보가 수정되었습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      queryClient.invalidateQueries({ queryKey: ['userBasicInfo'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export default useUpdateUserData;
