import { signIn } from "@apis/auth/auth";
import type { LoginFormValues } from "@utils/validate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const login = async (data: LoginFormValues) => {
		setIsLoading(true);
		setIsError(false);

		try {
			const response = await signIn(data);
			console.log("🚀 ~ login ~ response:", response);
			navigate("/");
			return response;
		} catch (err) {
			setIsError(true);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { login, isLoading, isError };
};
