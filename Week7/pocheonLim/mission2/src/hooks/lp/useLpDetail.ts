import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../apis/auth';
import { LpDetail } from '../../types/lp';

const fetchLpDetail = async (lpId: string): Promise<LpDetail> => {
  try {
    const res = await axiosInstance.get(`/v1/lps/${lpId}`);
    return res.data.data;
  } catch (error) {
    console.error('LP 상세 정보 조회 실패:', error);
    throw error;
  }
};

export const useLpDetail = (lpId: string | undefined) => {
  return useQuery({
    queryKey: ['lpDetail', lpId],
    queryFn: () => fetchLpDetail(lpId!),
    enabled: !!lpId,
    retry: 1,
  });
}; 