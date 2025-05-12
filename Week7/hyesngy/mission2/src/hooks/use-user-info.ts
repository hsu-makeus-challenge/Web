import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@apis/user/user";
import { useAuth } from "./use-auth";

export const useUserInfo = () => {
	const { isAuthenticated } = useAuth();

	return useQuery({
		queryKey: ["userInfo"],
		queryFn: getUserInfo,
		enabled: isAuthenticated,
		retry: (failureCount, error: any) => {
			if (error?.response?.status === 401) {
				return false;
			}
			return failureCount < 3;
		},
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
	});
};
