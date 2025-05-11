import type { LoginFormValues } from "@utils/validate";
import type {
	LoginResponse,
	SignupRequestData,
	SignupResponse,
} from "@typedefs/auth";
import { axiosInstance } from "@apis/config/instance";

export const signIn = async (
	loginData: LoginFormValues,
): Promise<LoginResponse> => {
	try {
		const response = await axiosInstance.post<LoginResponse>(
			"auth/signin",
			loginData,
		);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ signIn ~ error:", error);
		throw error;
	}
};

export const signUp = async (
	userData: SignupRequestData,
): Promise<SignupResponse> => {
	try {
		const response = await axiosInstance.post<SignupResponse>(
			"auth/signup",
			userData,
		);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ signUp ~ error:", error);
		throw error;
	}
};
