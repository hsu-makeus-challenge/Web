import { useEffect, useState } from "react";
import { getUserInfo } from "@apis/user/user";
import ErrorFallback from "@components/error-fallback";
import Spinner from "@components/spinner";
import type { UserInfo } from "@typedefs/user";

const MyPage = () => {
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const response = await getUserInfo();
				setUserInfo(response.data);
			} catch (error) {
				console.log("🚀 ~ fetchUserInfo ~ error:", error);
				setError("사용자 정보를 불러오는데 실패했습니다.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserInfo();
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		return <ErrorFallback />;
	}

	return <div>{userInfo && <p>{userInfo.name}님 환영합니다!</p>}</div>;
};

export default MyPage;
