import axios from "axios";
import type { LoginFormValues } from "@utils/validate";
import type { LoginResponse } from "@typedefs/auth";

const authInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const signIn = async (
	loginData: LoginFormValues,
): Promise<LoginResponse> => {
	try {
		const response = await authInstance.post<LoginResponse>(
			"auth/signin",
			loginData,
		);
		return response.data;
	} catch (error) {
		console.log("🚀 ~ error:", error);
		throw error;
	}
};
