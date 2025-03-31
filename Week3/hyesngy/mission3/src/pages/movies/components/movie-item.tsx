import type { Movie } from "@typedefs/movie";
import { useNavigate } from "react-router-dom";

interface MovieItemProps {
	movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			key={movie.id}
			className="relative group grid w-50 h-75 rounded-lg cursor-pointer"
			onClick={() => {
				navigate(`/movies/${movie.id}`);
			}}
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
};

export default MovieItem;
