import { JSX, useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  const { category } = useParams<{
    category: string;
  }>();
  

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovies(data.results);
        setIsPending(false);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, category]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600 bg-red-50 px-6 py-12 rounded-lg shadow-lg mx-4 text-center">
        <h2 className="text-3xl font-bold mb-4">에러가 발생했습니다</h2>
        <p className="text-lg">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-4 my-6">
        <button
          disabled={page === 1}
          onClick={(): void => setPage((prev): number => prev - 1)}
          className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 cursor-pointer disabled:cursor-not-allowed"
        >
          {"<"}
        </button>
        <span className="text-lg font-semibold">{page} 페이지</span>
        <button
          onClick={(): void => setPage((prev): number => prev + 1)}
          className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 cursor-pointer"
        >
          {">"}
        </button>
      </div>

      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map(
            (movie): JSX.Element => (
              <MovieCard key={movie.id} movie={movie} />
            )
          )}
        </div>
      )}
    </>
  );
}
