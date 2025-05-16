import GoogleBtn from "@components/social-login/google-btn";
import SignupHeader from "./components/signup-header";
import SignupForm from "./components/signup-form";

const SignupPage = () => {
	return (
		<div className="w-full p-10 flex flex-col items-center justify-center">
			<div className="w-80 mx-auto flex flex-col gap-6 items-center justify-center">
				<SignupHeader />
				<GoogleBtn />
				<p>OR</p>
				<SignupForm />
			</div>
		</div>
	);
};

export default SignupPage;
