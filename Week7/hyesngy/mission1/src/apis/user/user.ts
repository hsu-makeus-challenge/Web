import { axiosInstance } from "@apis/config/instance";
import type { UpdateUserRequest, UserInfoResponse } from "@typedefs/user";

export const getUserInfo = async (): Promise<UserInfoResponse> => {
	try {
		const response = await axiosInstance.get<UserInfoResponse>("users/me");
		return response.data;
	} catch (error) {
		console.log("🚀 ~ getUserInfo ~ error:", error);
		throw error;
	}
};

export const updateUserInfo = async (
	userData: UpdateUserRequest,
): Promise<UserInfoResponse> => {
	try {
		const response = await axiosInstance.patch<UserInfoResponse>(
			"users",
			userData,
		);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ updateUserInfo ~ error:", error);
		throw error;
	}
};

export const withdrawUser = async (): Promise<void> => {
	try {
		await axiosInstance.delete("users");
	} catch (error) {
		console.log("🚀 ~ withdrawUser ~ error:", error);
		throw error;
	}
};
