// src/hooks/useFetchMovies.ts
import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchMovies(category: string | undefined, page: number) {
  const [movies, setMovies] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const apiKey = import.meta.env.VITE_TMDB_KEY;

  useEffect(() => {
    if (!category) return;

    const fetchMovies = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        setMovies(response.data.results);
        setIsError(false);
      } catch (error) {
        console.error("영화 데이터를 불러오는 중 오류 발생:", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [category, page, apiKey]);

  return { movies, isPending, isError };
}
