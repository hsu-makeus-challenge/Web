import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "@typedefs/movie";
import { axiosInstance } from "@apis/config/instance";

interface UseGetMoviesProps {
	url?: string;
}

export const useGetMovies = ({ url }: UseGetMoviesProps) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (!url) return;

		const fetchMovies = async () => {
			setIsLoading(true);
			try {
				const { data } = await axiosInstance.get<MovieResponse>(url);
				setMovies(data.results);
			} catch {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMovies();

		window.scrollTo({
			top: 0,
		});
	}, [url]);

	return { movies, isLoading, isError };
};
