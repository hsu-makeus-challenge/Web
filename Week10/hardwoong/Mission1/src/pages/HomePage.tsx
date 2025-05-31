import { JSX, useCallback, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import { MovieFilters, MovieResponse } from "../types/movie";
import MovieList from "../components/Movie/MovieList";
import MovieFilter from "../components/Filter/MovieFilter";
import MovieDetailModal from "../components/Movie/Detail/MovieDetailModal";

const HomePage = (): JSX.Element => {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "",
    include_adult: false,
    language: "ko-KR",
  });
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const axiosRequestConfig = useMemo(
    (): { params: MovieFilters } => ({
      params: filters,
    }),
    [filters],
  )

  const { data, isPending, isError } = 
  useFetch<MovieResponse>(
    "/search/movie", 
    axiosRequestConfig,
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters],
  );

  const handleMovieClick = useCallback((id: number) => {
    setSelectedMovieId(id);
  }, [setSelectedMovieId]);

  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <div className="container mx-auto">
      <MovieFilter onChange={handleMovieFilters} />
      {isPending ? (
        <div>로딩 중 입니다...</div>
      ) : (
        <MovieList
          movies={data?.results || []}
          onMovieClick={handleMovieClick}
        />
      )}
      <MovieDetailModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
};

export default HomePage;
