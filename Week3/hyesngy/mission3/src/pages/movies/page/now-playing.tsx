import MovieList from "../components/movie-list";

const NowPlayingPage = () => {
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<MovieList category="now_playing" />
		</div>
	);
};

export default NowPlayingPage;
