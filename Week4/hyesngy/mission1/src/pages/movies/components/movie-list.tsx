import { useState } from "react";
import MovieItem from "./movie-item";
import { useGetMovies } from "@hooks/use-movie-hooks";
import Spinner from "@components/spinner";
import ErrorFallback from "@components/error-fallback";
import Pagination from "@components/pagination";
import type { Movie } from "@typedefs/movie";

interface MovieListProps {
	category: string;
}

const MovieList = ({ category }: MovieListProps) => {
	const [page, setPage] = useState(1);
	const url = `/movie/${category}?language=ko-KR&page=${page}`;

	const {
		movies,
		isLoading,
		isError,
	}: {
		movies: Movie[];
		isLoading: boolean;
		isError: boolean;
	} = useGetMovies(url);

	if (isLoading) return <Spinner />;
	if (isError) return <ErrorFallback />;

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
				{movies?.map((movie: Movie) => (
					<MovieItem key={movie.id} movie={movie} />
				))}
			</div>
			<Pagination page={page} setPage={setPage} />
		</>
	);
};

export default MovieList;
