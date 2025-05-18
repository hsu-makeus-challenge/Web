import type { Author } from "@typedefs/lp";

export interface Comment {
	id: number;
	content: string;
	lpId: number;
	authorId: number;
	createdAt: string;
	updatedAt: string;
	author: Author;
}

export interface ApiResponse<T> {
	status: boolean;
	statusCode: number;
	message: string;
	data: T;
}

export interface CommentListData {
	data: Comment[];
	nextCursor: number | null;
	hasNext: boolean;
}

export type CommentResponse = ApiResponse<CommentListData>;

export type CommentDetailResponse = ApiResponse<Comment>;

export type CommentDeleteResponse = ApiResponse<boolean>;

export type CommentOrderType = "asc" | "desc";

export interface GetCommentsParams {
	lpId: string | number;
	cursor?: number | null;
	limit?: number;
	order?: CommentOrderType;
}

export interface CreateCommentRequest {
	content: string;
}

export interface UpdateCommentRequest {
	content: string;
}
