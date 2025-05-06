export type LoginRequestData = {
	email: string;
	password: string;
};

export type LoginResponse = {
	status: boolean;
	statusCode: number;
	message: string;
	data: {
		id: number;
		name: string;
		accessToken: string;
		refreshToken: string;
	};
};

export type SignupRequestData = {
	name: string;
	email: string;
	password: string;
	bio?: string;
	avatar?: string;
};

export type SignupResponse = {
	status: boolean;
	message: string;
	statusCode: number;
	data: {
		id: number;
		name: string;
		email: string;
		bio: string;
		avatar: string;
		createdAt: string;
		updatedAt: string;
	};
};
