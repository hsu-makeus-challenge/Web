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
