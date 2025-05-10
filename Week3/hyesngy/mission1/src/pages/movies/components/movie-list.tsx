import type { Movie } from "@typedefs/movie";
import MovieItem from "./movie-item";

interface MovieListProps {
	movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
	console.log("🚀 ~ MovieList ~ movies:", movies);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
			{movies?.map((movie) => (
				<MovieItem key={movie.id} movie={movie} />
			))}
		</div>
	);
};

export default MovieList;
