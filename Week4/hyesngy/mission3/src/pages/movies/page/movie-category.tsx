import { useParams } from "react-router-dom";
import MovieList from "../components/movie-list";
import ErrorFallback from "@components/error-fallback";

const categories = ["popular", "top_rated", "upcoming", "now_playing"];

const MovieCategoryPage = () => {
	const { category } = useParams<{ category: string }>();

	if (!category || !categories.includes(category)) {
		return <ErrorFallback />;
	}

	return (
		<div className="w-full flex flex-col justify-center items-center">
			<MovieList category={category} />
		</div>
	);
};

export default MovieCategoryPage;
