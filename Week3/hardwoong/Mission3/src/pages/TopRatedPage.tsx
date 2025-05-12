import { JSX, useEffect, useState } from 'react';
import axios from 'axios';
import MovieGrid from '../components/MovieGrid';
import MovieType from '../types/MovieType';
import MovieResponse from '../types/MovieRespoonse';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const TopRated = (): JSX.Element => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      setLoading(true);
      try {
        const res = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDk0MzhhY2JmZWRhMGQ5ZWIyYjk3ODI4NzRjOTdlZCIsIm5iZiI6MTc0MzA0NzQwMC4zODcsInN1YiI6IjY3ZTRjYWU4NDIxZWI4YzMzMWJhMmYyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lY6hn_pEOwUHsRjD8vBWKgcM93QNIPVUgsy-izcUcVw`,
              accept: 'application/json',
            },
          }
        );
        setMovies(res.data.results);
        setError(null);
      } catch (err) {
        setError('영화를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <>
    <Pagination
        page={page}
        onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setPage((prev) => prev + 1)}
      />
      <MovieGrid movies={movies} />
    </>
  );
};

export default TopRated;