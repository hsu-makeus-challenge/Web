import { signIn } from "@apis/auth/auth";
import type { LoginFormValues } from "@utils/validate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./use-localstorage";
import { LOCAL_STORAGE_KEY } from "@constants/key";

export const useLogin = () => {
	const navigate = useNavigate();
	const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const login = async (data: LoginFormValues) => {
		setIsLoading(true);
		setIsError(false);

		try {
			const response = await signIn(data);
			setItem(response.data.accessToken);
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
