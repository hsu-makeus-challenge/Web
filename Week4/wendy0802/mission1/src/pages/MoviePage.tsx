import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import NotFoundPage from "./NotFoundPage"; // 추가
import { useState } from "react";
import useFetchMovies from "./../hooks/useFecthMovies";

export default function MoviePage(): JSX.Element {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();
  const { movies, isPending, isError } = useFetchMovies(category, page); // 커스텀 훅 사용

  if (isError) return <NotFoundPage />;

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        📜 {category?.replace("_", " ")} 📜
      </h1>

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
      </div>

      {isPending && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}

      <div>
        {movies && movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">영화 목록이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
