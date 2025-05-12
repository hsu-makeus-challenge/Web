export interface UserInfo {
	id: number;
	name: string;
	email: string;
	bio: string | null;
	avatar: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface UserInfoResponse {
	status: boolean;
	statusCode: number;
	message: string;
	data: UserInfo;
}

export interface UpdateUserRequest {
	name?: string;
	bio?: string;
	avatar?: string;
}

export interface User {
	id: number;
	name: string;
	email: string;
	bio?: string;
	avatar?: string;
	createdAt: string;
	updatedAt: string;
}
