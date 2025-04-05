import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../pages/LoadingSpinner";
import NotFoundPage from "../pages/NotFoundPage";

export default function MoviePage(): JSX.Element {
  const [movies, setMovies] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  const params = useParams<{ category: string }>();
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  const fetchMovies = useCallback(async () => {
    if (!params.category) return;
    setIsPending(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      setIsError(true);
      console.error("영화 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setIsPending(false);
    }
  }, [apiKey, page, params.category]);

  useEffect(() => {
    fetchMovies();
  }, [page, params.category]);

  if (isError)
    return <NotFoundPage />;

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-center mb-6">📜 {params.category} 📜</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-2 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 disabled:bg-gray-300"
        >
          {"<"}
        </button>
        <span className="text-lg font-bold">{page} 페이지</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-2 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500"
        >
          {">"}
        </button>

        {isPending && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>

      <div>
        {movies && movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div>영화 목록이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
