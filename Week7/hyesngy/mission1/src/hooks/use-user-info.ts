import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@apis/user/user";

export function useUserInfo() {
	return useQuery({
		queryKey: ["userInfo"],
		queryFn: getUserInfo,
		staleTime: 1000 * 60 * 5,
		retry: 1,
	});
}
