import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "@constants/key";
import { useLocalStorage } from "@hooks/use-localstorage";
import type { LoginFormValues } from "@utils/validate";
import { signIn } from "@apis/auth/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const { setItem, getItem, removeItem } = useLocalStorage(
		LOCAL_STORAGE_KEY.accessToken,
	);
	const { setItem: setRefreshToken, removeItem: removeRefreshToken } =
		useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

	const login = async (data: LoginFormValues): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await signIn(data);
			setItem(response.data.accessToken);
			setRefreshToken(response.data.refreshToken);
			setIsAuthenticated(true);
			navigate("/mypage");
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		removeItem();
		removeRefreshToken();
		setIsAuthenticated(false);
		navigate("/");
	};

	useEffect(() => {
		const token = getItem();
		setIsAuthenticated(!!token);
	}, [getItem]);

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}
