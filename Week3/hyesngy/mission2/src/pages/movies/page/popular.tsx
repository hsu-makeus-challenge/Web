import MovieList from "../components/movie-list";

const PopularPage = () => {
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<MovieList category="popular" />
		</div>
	);
};

export default PopularPage;
