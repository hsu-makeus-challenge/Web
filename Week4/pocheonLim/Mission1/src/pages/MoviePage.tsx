import { useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpiner";
import { ErrorFallback } from "../components/ErrorFallback";
import { useCustomFetch } from "../hooks/useCustomFetch";

// 영화 목록 응답 타입 정의
interface MovieListResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  const { data, error, isLoading } = useCustomFetch<MovieListResponse>({
    endpoint: `/movie/${category}`,
    params: {
      language: 'ko-KR',
      page: page
    }
  });

  if (error) {
    return <ErrorFallback message={error} />;
  }

  return (
    <>
      <div className='flex items-center justify-center gap-6 mt-5'>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-a;; duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed" 
          disabled={page === 1} 
          onClick={(): void => setPage((prev): number => prev - 1)}>{`<`}</button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-a;; duration-200 cursor-pointer" 
          onClick={(): void => setPage((prev): number => prev + 1)}>
          {`>`}
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && data && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}