import { useCallback, useState } from 'react';
import MovieFilter from '../components/movie-filter';
import MovieForm from '../components/movie-form';
import { useCustomFetch } from '../hooks/useCustomFetch';
import { MovieFilters, MovieResponse } from '../types/movie';
import Pagination from '../components/pagination';

const SearchPage = () => {
  const [filters, setFilters] = useState<MovieFilters>({
    query: '',
    include_adult: false,
    language: 'ko-KR',
  });
  const [page, setPage] = useState(1);
  const searchUrl =
    filters.query !== ''
      ? `https://api.themoviedb.org/3/search/movie?query=${filters.query}&include_adult=${filters.include_adult}&language=${filters.language}&page=${page}`
      : '';

  const { data, isLoading, error } = useCustomFetch<MovieResponse>(searchUrl, [
    filters,
  ]);

  //참조값이 고정된 함수 setFilters가 변경되지 않는 한
  const handleFilterChange = useCallback(
    (newFilters: MovieFilters) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  const movies = data?.results || [];

  const nextPage = () => {
    setPage((p) => p + 1);
    window.scrollTo(0, 0);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((p) => p - 1);
      window.scrollTo(0, 0);
    }
  };

  if (error) {
    return (
      <div className="text-center text-3xl font-bold text-red-500 flex justify-center items-center h-screen">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          영화 검색
        </h1>

        <MovieFilter onChange={handleFilterChange} />

        <Pagination
          currentPage={page}
          onPrevPage={prevPage}
          onNextPage={nextPage}
        />

        {filters.query.trim() ? (
          <div className="mt-6">
            {movies.length > 0 ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-white">
                  검색 결과 ({movies.length}개)
                </h2>
                <MovieForm movies={movies} isLoading={isLoading} />
              </>
            ) : !isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">영화를 검색하세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
