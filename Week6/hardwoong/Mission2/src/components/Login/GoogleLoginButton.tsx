const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full border border-white rounded px-4 py-2 flex items-center justify-center mb-2 text-white cursor-pointer"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
        alt="Google"
        className="w-5 h-5 mr-2"
      />
      구글 로그인
    </button>
  );
};

export default GoogleLoginButton;