import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movie";
import MovieModal from "../components/MovieCardModal";

const Homepage = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });
  const axiosRequestConfig = useMemo(
    (): { params: MovieFilters } => ({
      params: filters,
    }),
    [filters]
  );
  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );
  // console.log(import.meta.env.VITE_TMDB_TOKEN);
  //console.log(data?.results);
  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>로딩중 입니다.</div>
      ) : (
        <MovieList
          movies={data?.results || []}
          onMovieClick={(movie) => setSelectedMovie(movie)}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Homepage;
