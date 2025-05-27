import { useEffect, useState } from "react";
import type { Movie } from "@typedefs/movie";
import { axiosInstance } from "@apis/config/instance";

interface UseGetMovieDetailProps {
	url?: string;
}

export const useGetMovieDetail = ({ url }: UseGetMovieDetailProps) => {
	const [movie, setMovie] = useState<Movie>();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (!url) return;

		const fetchMovieDetail = async () => {
			setIsLoading(true);
			try {
				const { data } = await axiosInstance.get<Movie>(url);
				setMovie(data);
			} catch {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMovieDetail();

		window.scrollTo({
			top: 0,
		});
	}, [url]);

	return { movie, isLoading, isError };
};
