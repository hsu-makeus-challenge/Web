import { useState } from "react";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}
export default function MovieCard({ movie }: MovieCardProps): Element {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg 
      cursor-pointer w-44 transition-transformc duration-500 hover:scale-105"
      onMouseEnter={(): void => setIsHover(true)}
      onMouseLeave={(): void => setIsHover(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title}양화의 이미지`}
        className=""
      />
      {isHover && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md
         text-white flex flex-col justify-center items-center p-4"
        >
          <h2 className="text-lg font-bold text-center leading-snug">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}
