// src/hooks/useFetchMovies.ts
import { useState, useEffect } from "react";
import axios from "axios";

// ✅ 카테고리 이름을 실제 API endpoint에 맞게 변환하는 맵
const categoryMap: Record<string, string> = {
  popular: "popular",
  "top-rated": "top_rated",
  "now-playing": "now_playing",
  upcoming: "upcoming",
};

export default function useFetchMovies(category: string | undefined, page: number) {
  const [movies, setMovies] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const apiKey = import.meta.env.VITE_TMDB_KEY;

  useEffect(() => {
    if (!category) return;

    // ✅ category를 API용 엔드포인트로 변환
    const mappedCategory = categoryMap[category];

    // category가 올바르지 않을 경우 에러 처리
    if (!mappedCategory) {
      setIsError(true);
      return;
    }

    const fetchMovies = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${mappedCategory}?language=en-US&page=${page}`,
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
