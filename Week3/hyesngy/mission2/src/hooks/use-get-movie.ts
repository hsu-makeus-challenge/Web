import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "@typedefs/movie";
import { axiosInstance } from "@apis/config/instance";

interface UseGetMoviesProps {
	category?: string;
}

export const useGetMovies = ({ category }: UseGetMoviesProps) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchMovies = async () => {
			setIsLoading(true);
			try {
				const endpoint = `/movie/${category}?language=ko-KR&page=${page}`;
				const { data } = await axiosInstance.get<MovieResponse>(endpoint);
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
	}, [category, page]);

	return { movies, isLoading, isError, page, setPage };
};
