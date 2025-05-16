import GoogleLogin from "@assets/google-login-btn.svg";

const GoogleBtn = () => {
	const handleGoogleLogin = () => {
		window.location.href = `${import.meta.env.VITE_BASE_URL}auth/google/login`;
	};

	return (
		<>
			<button
				type="button"
				onClick={handleGoogleLogin}
				className="cursor-pointer"
			>
				<img src={GoogleLogin} alt="Google Login" />
			</button>
		</>
	);
};

export default GoogleBtn;
