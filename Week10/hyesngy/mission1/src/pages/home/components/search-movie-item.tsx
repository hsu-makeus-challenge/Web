import React from "react";
import type { Movie } from "@typedefs/movie";

interface SearchMovieItemProps {
	movie: Movie;
	onMovieClick: (movieId: number) => void;
}

const SearchMovieItem = React.memo(
	({ movie, onMovieClick }: SearchMovieItemProps) => {
		const handleClick = React.useCallback(() => {
			onMovieClick(movie.id);
		}, [movie.id, onMovieClick]);

		return (
			<button
				type="button"
				className="relative group grid w-50 h-75 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
				onClick={handleClick}
			>
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					className="w-full h-full object-cover rounded-lg"
				/>
				<div
					className="absolute inset-0 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 
                  flex flex-col items-center justify-center text-center gap-2"
				>
					<p className="text-lg font-bold text-white">{movie.title}</p>
					<p className="text-sm font-light line-clamp-4 leading-relaxed max-w-10/12 text-gray-100">
						{movie.overview}
					</p>
				</div>
			</button>
		);
	},
);

SearchMovieItem.displayName = "SearchMovieItem";

export default SearchMovieItem;
