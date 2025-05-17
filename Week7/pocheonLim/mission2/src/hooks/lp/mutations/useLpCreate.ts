import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLp } from '../../../apis/lp';

export const useLpCreate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userLpList'] });
    },
    onError: () => {
      alert('LP 생성에 실패했습니다.');
    }
  });

  const handleAddLp = (data: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
  }) => {
    mutation.mutate(data);
  };

  return {
    mutation,
    handleAddLp
  };
}; 