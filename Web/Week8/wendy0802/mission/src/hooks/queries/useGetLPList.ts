import { useQuery } from "@tanstack/react-query";
import { getLPList } from "../../api/lp";
import { QUERY_KEY } from "../../constants/key";
import { LPListResponse } from "../../types/lp";

interface UseGetLPListParams {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: 'asc' | 'desc';
}

function useGetLPList(params: UseGetLPListParams = {}) {
  return useQuery<LPListResponse>({
    queryKey: [QUERY_KEY.lps, params.search, params.order],
    queryFn: () => getLPList(params),
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10,   
  });
}

export default useGetLPList;