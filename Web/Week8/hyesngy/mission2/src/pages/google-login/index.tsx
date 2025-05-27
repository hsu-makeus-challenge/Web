import { LOCAL_STORAGE_KEY } from "@constants/key";
import { useLocalStorage } from "@hooks/common/use-localstorage";
import { useEffect } from "react";

const GoogleLoginRedirectPage = () => {
	const { setItem: setAccessToken } = useLocalStorage(
		LOCAL_STORAGE_KEY.accessToken,
	);
	const { setItem: setRefreshToken } = useLocalStorage(
		LOCAL_STORAGE_KEY.refreshToken,
	);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const accessToken = params.get(LOCAL_STORAGE_KEY.accessToken);
		const refreshToken = params.get(LOCAL_STORAGE_KEY.refreshToken);

		if (accessToken) {
			setAccessToken(accessToken);
			setRefreshToken(refreshToken);
			window.location.href = "/mypage";
		} else {
			window.location.href = "/login";
		}
	}, [setAccessToken, setRefreshToken]);

	return <div>Google Login Redirect</div>;
};

export default GoogleLoginRedirectPage;
