import { createContext } from "react";
import type { LoginFormValues } from "@utils/validate";

export interface AuthContextType {
	isAuthenticated: boolean;
	login: (data: LoginFormValues) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);
