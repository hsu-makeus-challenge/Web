import MovieList from "../components/movie-list";

const TopRatedPage = () => {
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<MovieList category="top_rated" />
		</div>
	);
};

export default TopRatedPage;
