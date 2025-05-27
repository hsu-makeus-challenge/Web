// import { useQuery } from "@tanstack/react-query";
// import { QUERY_KEY } from "../../constants/key";
// import { LpData } from "../../types/LpData";
// import { getLpDetail } from "../../apis/lp";

// function useGetLpDetail({id}: LpData) {
//   return useQuery({
//     queryKey: [QUERY_KEY.lps, id],
//     queryFn: () => getLpDetail({id}),
//   });
// }

// export default useGetLpDetail;

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";
import { LpData } from "../../types/LpData";

function useGetLpDetail(lpId: number) {
  return useQuery<LpData>({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail(lpId),
  });
}

export default useGetLpDetail;