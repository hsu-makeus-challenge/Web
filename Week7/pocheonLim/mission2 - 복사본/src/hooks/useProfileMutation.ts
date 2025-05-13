import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../apis/auth';
import { User } from '../types/user';

type UserWithOptionalFields = Omit<User, 'bio' | 'avatar' | 'createdAt' | 'updatedAt'> & {
  bio?: string | null;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export function useProfileMutation(user: UserWithOptionalFields | null, updateUser: (u: UserWithOptionalFields) => void) {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name: string; bio?: string | null; avatar?: string }) => {
      const response = await updateProfile(data);
      return response.data;
    },
    onMutate: async (newData) => {
      const previousUser = user;
      if (previousUser) {
        updateUser({
          ...previousUser,
          name: newData.name,
          bio: newData.bio || null,
          avatar: newData.avatar || previousUser.avatar,
        });
      }
      return { previousUser };
    },
    onError: (_, __, context) => {
      if (context?.previousUser) {
        updateUser(context.previousUser);
      }
      alert('프로필 업데이트에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return updateProfileMutation;
} 