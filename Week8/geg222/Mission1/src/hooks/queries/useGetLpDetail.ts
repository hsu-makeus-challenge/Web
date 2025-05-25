import { useQuery } from "@tanstack/react-query";
import { getLpById } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpDetail(lpId: number) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpById(lpId),
    enabled: !!lpId,
  });
}

export default useGetLpDetail;