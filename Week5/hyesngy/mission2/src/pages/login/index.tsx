import type { LoginFormValues } from "@utils/validate";
import Spinner from "@components/spinner";
import LoginForm from "./components/login-form";
import LoginHeader from "./components/login-header";
import GoogleBtn from "@components/social-login/google-btn";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@hooks/use-auth";

const LoginPage = () => {
	const { login, isLoading, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from || "/";

	useEffect(() => {
		if (isAuthenticated) {
			navigate(from, { replace: true });
		}
	}, [isAuthenticated, navigate, from]);

	const handleSubmit = async (data: LoginFormValues) => {
		try {
			await login(data);
		} catch (err) {
			console.log("🚀 ~ handleSubmit ~ err:", err);
		}
	};

	if (isLoading) return <Spinner />;

	return (
		<div className="w-full p-10 flex flex-col items-center justify-center">
			<div className="w-80 mx-auto flex flex-col gap-6 items-center justify-center">
				<LoginHeader />
				<GoogleBtn />
				<LoginForm onSubmit={handleSubmit} />
			</div>
		</div>
	);
};

export default LoginPage;
