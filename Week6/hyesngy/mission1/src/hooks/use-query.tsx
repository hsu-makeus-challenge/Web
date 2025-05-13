import { useQuery } from "@tanstack/react-query";
import { getLps } from "@apis/lp/lp";
import type { GetLpsParams } from "@typedefs/lp";

export function useLpsQuery({
	order = "desc",
	limit = 30,
	search,
}: GetLpsParams = {}) {
	return useQuery({
		queryKey: ["lps", { order, limit, search }],
		queryFn: () => getLps({ order, limit, search }),
		staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선도 유지
	});
}
