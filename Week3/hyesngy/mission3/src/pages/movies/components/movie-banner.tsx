import type { Movie } from "@typedefs/movie";

const MovieBanner = ({ movie }: { movie: Movie }) => {
	const {
		backdrop_path,
		title,
		vote_average,
		vote_count,
		release_date,
		runtime,
		overview,
	} = movie;

	return (
		<div className="relative w-full">
			<img
				src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
				alt={title}
				className="w-full h-96 object-cover"
			/>
			<div className="absolute inset-0 flex flex-col px-10 py-30 gap-2 bg-black/50">
				<h1 className="text-3xl font-bold mb-5">{title}</h1>
				<p>
					평점 {vote_average} ({vote_count}건)
				</p>
				<p>{release_date}</p>
				<p>{runtime} 분</p>
				<p>{overview}</p>
			</div>
		</div>
	);
};

export default MovieBanner;
