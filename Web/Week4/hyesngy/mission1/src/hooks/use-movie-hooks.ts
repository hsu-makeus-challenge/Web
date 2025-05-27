import type { Movie, MovieResponse } from "@typedefs/movie";
import { useFetch } from "./use-Fetch";

export const useGetMovies = (url?: string) => {
	const { data, isLoading, isError } = useFetch<MovieResponse>(url);

	return {
		movies: data?.results || [],
		isLoading,
		isError,
	};
};

export const useGetMovieDetail = (url?: string) => {
	const { data, isLoading, isError } = useFetch<Movie>(url);

	return {
		movie: data,
		isLoading,
		isError,
	};
};
