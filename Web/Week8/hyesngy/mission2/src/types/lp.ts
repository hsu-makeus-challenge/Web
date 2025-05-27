export interface Tag {
	id: number;
	name: string;
}

export interface Like {
	id: number;
	userId: number;
	lpId: number;
}

export interface Author {
	id: number;
	name: string;
	email: string;
	bio: string;
	avatar: string;
	createdAt: string;
	updatedAt: string;
}
export interface Lp {
	id: number;
	title: string;
	content: string;
	thumbnail: string;
	published: boolean;
	authorId: number;
	createdAt: string;
	updatedAt: string;
	tags: Tag[];
	likes: Like[];
	author?: Author;
}

export interface LpListData {
	data: Lp[];
	nextCursor: number | null;
	hasNext: boolean;
}

export interface LpResponse {
	status: boolean;
	statusCode: number;
	message: string;
	data: LpListData;
}

export type OrderType = "asc" | "desc";

export interface GetLpsParams {
	cursor?: number | null;
	limit?: number;
	search?: string;
	order?: OrderType;
}

export interface LpDetailResponse {
	status: boolean;
	statusCode: number;
	message: string;
	data: Lp;
}

export interface CreateLpRequest {
	title: string;
	content: string;
	thumbnail: string;
	tags: string[];
	published: boolean;
}

export interface CreateLpResponse {
	status: boolean;
	statusCode: number;
	message: string;
	data: Lp;
}

export interface UploadImageResponse {
	status: boolean;
	message: string;
	statusCode: number;
	data: {
		imageUrl: string;
	};
}
