import { useQuery } from '@tanstack/react-query';
import userDataFetch from '../../../apis/user/userDataFetch';

const useGetUserBasicInfo = () => {
  return useQuery({
    queryKey: ['userBasicInfo'],
    queryFn: userDataFetch,
    staleTime: 1000 * 10,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
    enabled: !!localStorage.getItem('accessToken'),
  });
};

export default useGetUserBasicInfo;
