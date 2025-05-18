import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@apis/auth/auth";
import { LOCAL_STORAGE_KEY } from "@constants/key";
import type { LoginFormValues } from "@utils/validate";

export const useLoginMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: LoginFormValues) => {
			const response = await signIn(data);
			return response.data;
		},
		onSuccess: (data) => {
			localStorage.setItem(
				LOCAL_STORAGE_KEY.accessToken,
				JSON.stringify(data.accessToken),
			);
			localStorage.setItem(
				LOCAL_STORAGE_KEY.refreshToken,
				JSON.stringify(data.refreshToken),
			);

			queryClient.setQueryData(["auth", "status"], { isAuthenticated: true });

			queryClient.invalidateQueries({ queryKey: ["userInfo"] });
		},
	});
};

export const useLogoutMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			return Promise.resolve({ success: true });
		},
		onSuccess: () => {
			localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
			localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
			queryClient.setQueryData(["auth", "status"], { isAuthenticated: false });

			queryClient.invalidateQueries({ queryKey: ["userInfo"] });
			queryClient.removeQueries({ queryKey: ["userInfo"] });
		},
	});
};
