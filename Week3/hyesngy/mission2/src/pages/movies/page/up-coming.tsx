import MovieList from "../components/movie-list";

const UpCommingPage = () => {
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<MovieList category="upcoming" />
		</div>
	);
};

export default UpCommingPage;
