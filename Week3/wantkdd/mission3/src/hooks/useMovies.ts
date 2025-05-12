import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';

export const useMovies = (classfication: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${classfication}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovies(data.results);
        setError(null);
      } catch (err) {
        setError(
          '🚨영화를 불러오지 못했다. 무언가가 잘못 된 것이 분명하다..🚨'
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [classfication, page]);

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

  return { movies, isLoading, error, page, nextPage, prevPage };
};
