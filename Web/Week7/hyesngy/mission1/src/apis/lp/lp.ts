import { axiosInstance } from "@apis/config/instance";
import type {
	CreateLpRequest,
	CreateLpResponse,
	GetLpsParams,
	LpDetailResponse,
	LpResponse,
} from "@typedefs/lp";

export const getLps = async ({
	cursor = null,
	limit = 30,
	search,
	order = "desc",
}: GetLpsParams = {}): Promise<LpResponse> => {
	try {
		const params = new URLSearchParams();

		if (cursor !== null) params.append("cursor", cursor.toString());
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

export const createLp = async (
	lpData: CreateLpRequest,
): Promise<CreateLpResponse> => {
	try {
		const response = await axiosInstance.post<CreateLpResponse>("lps", lpData);
		console.log("🚀 ~ lpData:", lpData);

		return response.data;
	} catch (error) {
		console.log("🚀 ~ createLp ~ error:", error);
		throw error;
	}
};

export const deleteLp = async (lpId: number) => {
	const response = await axiosInstance.delete(`/lps/${lpId}`);
	return response.data;
};

export const addLike = async (lpId: number) => {
	try {
		const response = await axiosInstance.post(`lps/${lpId}/likes`);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ addLike ~ error:", error);
		throw error;
	}
};

export const removeLike = async (lpId: number) => {
	try {
		const response = await axiosInstance.delete(`lps/${lpId}/likes`);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ removeLike ~ error:", error);
		throw error;
	}
};

export const updateLp = async (
	lpId: number,
	updateData: Partial<CreateLpRequest>,
) => {
	try {
		const response = await axiosInstance.patch(`lps/${lpId}`, updateData);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ updateLp ~ error:", error);
		throw error;
	}
};
