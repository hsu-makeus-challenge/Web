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
