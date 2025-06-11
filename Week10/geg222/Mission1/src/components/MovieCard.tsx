import { useState } from "react";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: (movieId: number) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImageImage = "https://via.placeholder.com/640x480";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer
    transition-transform duration-500 hover:scale-105"
      onMouseEnter={(): void => setIsHovered(true)}
      onMouseLeave={(): void => setIsHovered(false)}
      onClick={() => onClick(movie.id)}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : fallbackImageImage
          }
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute right-2 top-2 rounded-md bg-black px-2 py-1 text-sm font-bold text-white">
          {movie.vote_average.toFixed(1)}
        </div>
        {isHovered && (
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/50
        to-transparent backdrop-blur-md flex flex-col justify-center 
        items-center text-white p-4"
          >
            <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
            <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">
              {movie.overview}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
