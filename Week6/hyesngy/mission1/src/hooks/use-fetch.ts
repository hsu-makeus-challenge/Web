import { useEffect, useState } from "react";
import { axiosInstance } from "@apis/config/instance";

export const useFetch = <T>(url?: string) => {
	const [data, setData] = useState<T | undefined>();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (!url) return;

		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await axiosInstance.get<T>(url);
				setData(response.data);
			} catch (error) {
				setIsError(true);
				console.log("🚀 ~ fetchData ~ error:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();

		window.scrollTo({
			top: 0,
		});
	}, [url]);

	return { data, isLoading, isError };
};
