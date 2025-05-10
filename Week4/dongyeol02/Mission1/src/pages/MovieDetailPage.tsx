import { data, useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { CreditsResponse, MovieDetailResponse } from "../types/movie";
import MovieInfo from "../components/MovieInfo";
import PersonList from "../components/PersonList";

const MovieDetailPage = (): Element => {
  const params = useParams();
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}`;
  const {
    isPending,
    isError,
    data: movie,
  } = useCustomFetch<MovieDetailResponse>(url);

  const creditUrl = `https://api.themoviedb.org/3/movie/${params.movieId}/credits`;
  const { data: credits } = useCustomFetch<CreditsResponse>(creditUrl);

  if (isPending) {
    return <div>loading....</div>;
  }

  if (isError) {
    return (
      <div>
        <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <div
      className="bg-black backdrop-blur-md
         text-white w-full min-h-screen relative"
    >
      {movie && <MovieInfo moviedetail={movie} />}
      <div className="text-white text-4xl pb-5 pt-5">감독/출현</div>
      <div>
        <PersonList people={credits?.crew ?? []} />
        <PersonList people={credits?.cast ?? []} />
      </div>
    </div>
  );
};

export default MovieDetailPage;
