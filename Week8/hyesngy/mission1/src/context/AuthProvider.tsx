import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "@constants/key";
import { useLocalStorage } from "@hooks/common/use-localstorage";
import type { LoginFormValues } from "@utils/validate";
import {
	useLoginMutation,
	useLogoutMutation,
} from "@hooks/auth/use-auth-mutations";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const loginMutation = useLoginMutation();
	const logoutMutation = useLogoutMutation();

	const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

	const login = async (data: LoginFormValues): Promise<void> => {
		try {
			await loginMutation.mutateAsync(data);
			setIsAuthenticated(true);
			navigate("/");
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	};

	const logout = () => {
		logoutMutation.mutate();
		setIsAuthenticated(false);
		navigate("/");
	};

	useEffect(() => {
		const token = getItem();
		if (token) {
			setIsAuthenticated(true);
			queryClient.setQueryData(["auth", "status"], { isAuthenticated: true });
		}
	}, [getItem, queryClient]);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				login,
				logout,
				isLoading: loginMutation.isPending,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
