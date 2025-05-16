import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "@apis/lp/lp";

export function useGetLpDetail(lpId: string | undefined) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["lp", lpId],
		queryFn: () => getLpDetail(lpId),
		enabled: !!lpId,
		staleTime: 1000 * 60 * 5,
		retry: 1,
	});

	return {
		lp: data?.data,
		isLoading,
		isError,
	};
}
