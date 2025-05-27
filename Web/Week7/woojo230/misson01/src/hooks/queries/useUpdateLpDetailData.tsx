import { useMutation, useQueryClient } from '@tanstack/react-query';
import lpDetailUpdate from '../../apis/lp/lpDetailUpdate';
import lpDetailDelete from '../../apis/lp/lpDetailDelete';
import { LpDetailUpdateType } from '../../type/type';

interface LpDetailUpdateProps {
  lpId: number;
  lpDetailData: LpDetailUpdateType;
}

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ lpId, lpDetailData }: LpDetailUpdateProps) =>
      lpDetailUpdate({ lpId, lpDetailData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail'] });
      alert('LP 상세 정보가 성공적으로 수정되었습니다!');
    },
    onError: () => {
      alert('LP 상세 정보 수정 실패');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (lpId: number) => lpDetailDelete(lpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail'] });
      alert('LP 상세 정보가 성공적으로 삭제되었습니다!');
    },
    onError: () => {
      alert('LP 상세 정보 삭제 실패');
    },
  });

  return {
    updateLpDetailData: updateMutation.mutate,
    deleteLpDetailData: deleteMutation.mutate,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export default useCommentMutation;
