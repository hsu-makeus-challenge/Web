import { axiosInstance } from "@apis/config/instance";
import type { UserInfoResponse } from "@typedefs/user";

export const getUserInfo = async (): Promise<UserInfoResponse> => {
	try {
		const response = await axiosInstance.get<UserInfoResponse>("users/me");
		return response.data;
	} catch (error) {
		console.log("🚀 ~ getUserInfo ~ error:", error);
		throw error;
	}
};
