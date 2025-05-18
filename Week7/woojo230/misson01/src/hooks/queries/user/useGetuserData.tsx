import { useQuery } from '@tanstack/react-query';
import userDataFetch from '../../../apis/user/userDataFetch';

const useGetuserData = () => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: userDataFetch,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetuserData;
