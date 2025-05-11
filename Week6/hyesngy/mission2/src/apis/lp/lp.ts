import { axiosInstance } from "@apis/config/instance";
import type { GetLpsParams, LpDetailResponse, LpResponse } from "@typedefs/lp";

export const getLps = async ({
	cursor= null,
	limit = 30,
	search,
	order = "desc",
}: GetLpsParams = {}): Promise<LpResponse> => {
	try {
		const params = new URLSearchParams();

		if (cursor!==null) params.append("cursor", cursor.toString());
		if (limit) params.append("limit", limit.toString());
		if (search) params.append("search", search);
		if (order) params.append("order", order);

		const url = `lps?${params.toString()}`;
		const response = await axiosInstance.get<LpResponse>(url);
		console.log("🚀 ~ response:", response);

		return response.data;
	} catch (error) {
		console.log("🚀 ~ getLps ~ error:", error);
		throw error;
	}
};

export const getLpDetail = async (
	lpId: string | undefined,
): Promise<LpDetailResponse> => {
	try {
		if (!lpId) {
			throw new Error("LP ID가 없습니다.");
		}

		const response = await axiosInstance.get<LpDetailResponse>(`lps/${lpId}`);
		console.log("🚀 ~ response.data:", response.data);

		return response.data;
	} catch (error) {
		console.log("🚀 ~ error:", error);
		throw error;
	}
};
