import { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetailResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MoviePage(): Element {
  //3. 페이지 처리
  const [page, setPage] = useState(1);
  //4.동적으로 받아오기
  const { category } = useParams<{
    category: string;
  }>();

  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page= ${page}`;
  const {
    data: movies,
    isPending,
    isError,
  } = useCustomFetch<MovieDetailResponse>(url);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  //나중에 컴포넌트로 뻬기
  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2bad1] transition-all duration-200 disaled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={(): void => setPage((prev): number => prev - 1)}
        >{`<`}</button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2bad1] transition-all duration-200 disaled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed"
          onClick={(): void => setPage((prev): number => prev + 1)}
        >{`>`}</button>
      </div>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="grid gap-4 p-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies?.results.map(
            (movie): Element => (
              <MovieCard key={movie.id} movie={movie} />
            )
          )}
        </div>
      )}
    </>
  );
}
