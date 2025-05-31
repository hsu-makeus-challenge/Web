import { JSX, memo } from "react";
import { Movie } from "../../types/movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  onMovieClick?: (id: number) => void;
}

const MovieList = ({ movies, onMovieClick }: MovieListProps): JSX.Element => {
  console.log("MovieList 렌더링", movies);
  if (movies.length === 0) {
    return (
      <div className='flex h-60 items-center justify-center'>
        <p className='font-bold text-gray-500'>검색 결과가 없습니다.</p>
      </div>);
  }
  return (
    <div className="grid gap-x-0 gap-y-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick?.(movie.id)}
        />
      ))}
    </div>
  )
}

export default memo(MovieList);
