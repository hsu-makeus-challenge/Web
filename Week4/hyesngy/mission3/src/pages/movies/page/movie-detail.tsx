import { useParams } from "react-router-dom";
import ErrorFallback from "@components/error-fallback";
import Spinner from "@components/spinner";
import { useGetMovieDetail } from "@hooks/use-movie-hooks";
import type { Movie } from "@typedefs/movie";
import CreditList from "@pages/movies/components/credit-list";
import MovieBanner from "@pages/movies/components/movie-banner";

const DetailPage = () => {
	const { movieId } = useParams();
	const url = `/movie/${movieId}?append_to_response=credits&language=ko-KR`;
	const {
		movie,
		isLoading,
		isError,
	}: {
		movie: Movie | undefined;
		isLoading: boolean;
		isError: boolean;
	} = useGetMovieDetail(url);

	if (isLoading) return <Spinner />;
	if (isError || !movie) return <ErrorFallback />;

	return (
		<div className="w-full flex flex-col justify-center items-center">
			<MovieBanner movie={movie} />
			<CreditList movie={movie} />
		</div>
	);
};

export default DetailPage;
