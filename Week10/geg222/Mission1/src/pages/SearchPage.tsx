import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import { MovieFilters, MovieResponse } from "../types/movie";
import useFetch from "../hooks/useFetch";
import MovieDetailModal from "../components/MovieModal/MovieDetailModal";


const SearchPage = () => {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "",
    include_adult: false,
    language: "ko-KR",
  });
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );

  const handleMovieClick = useCallback((id: number) => {
    setSelectedMovieId(id);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 flex flex-col items-center min-h-screen">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div className="text-white mt-4">로딩 중...</div>
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

export default SearchPage;
