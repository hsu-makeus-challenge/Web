import type { LoginFormValues } from "@utils/validate";
import { useLogin } from "@hooks/use-login";
import Spinner from "@components/spinner";
import ErrorFallback from "@components/error-fallback";
import LoginForm from "./components/login-form";
import LoginHeader from "./components/login-header";
import GoogleBtn from "@components/social-login/google-btn";

const LoginPage = () => {
	const { login, isLoading, isError } = useLogin();

	const handleSubmit = async (data: LoginFormValues) => {
		try {
			await login(data);
		} catch (err) {
			console.log("🚀 ~ handleSubmit ~ err:", err);
		}
	};

	if (isLoading) return <Spinner />;
	if (isError) return <ErrorFallback />;

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
