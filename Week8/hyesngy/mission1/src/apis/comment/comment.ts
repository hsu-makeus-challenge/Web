import { axiosInstance } from "@apis/config/instance";
import type {
	CommentResponse,
	GetCommentsParams,
	CreateCommentRequest,
	CommentDetailResponse,
	UpdateCommentRequest,
	CommentDeleteResponse,
} from "@typedefs/comment";

export const getComments = async ({
	lpId,
	cursor = null,
	limit = 10,
	order = "desc",
}: GetCommentsParams): Promise<CommentResponse> => {
	try {
		const params = new URLSearchParams();

		if (cursor !== null) params.append("cursor", cursor.toString());
		if (limit) params.append("limit", limit.toString());
		if (order) params.append("order", order);

		const url = `lps/${lpId}/comments?${params.toString()}`;
		const response = await axiosInstance.get<CommentResponse>(url);

		return response.data;
	} catch (error) {
		console.log("🚀 ~ getComments ~ error:", error);
		throw error;
	}
};

export const createComment = async (
	lpId: string | number,
	commentData: CreateCommentRequest,
): Promise<CommentDetailResponse> => {
	try {
		const response = await axiosInstance.post<CommentDetailResponse>(
			`lps/${lpId}/comments`,
			commentData,
		);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ createComment ~ error:", error);
		throw error;
	}
};

export const updateComment = async (
	lpId: number | string,
	commentId: number,
	updateData: UpdateCommentRequest,
): Promise<CommentDetailResponse> => {
	try {
		const response = await axiosInstance.patch<CommentDetailResponse>(
			`lps/${lpId}/comments/${commentId}`,
			updateData,
		);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ updateComment ~ error:", error);
		throw error;
	}
};

export const deleteComment = async (
	lpId: number | string,
	commentId: number,
): Promise<CommentDeleteResponse> => {
	try {
		const response = await axiosInstance.delete<CommentDeleteResponse>(
			`lps/${lpId}/comments/${commentId}`,
		);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ deleteComment ~ error:", error);
		throw error;
	}
};
