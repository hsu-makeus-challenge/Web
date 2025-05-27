import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";

function useGetMyInfo() {
  const accessToken = localStorage.getItem("accessToken");

  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱
    enabled: !!accessToken, // accessToken이 있을 때만 실행
  });
}

export default useGetMyInfo;
