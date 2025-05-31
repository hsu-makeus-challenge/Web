import { useState, JSX } from "react";
import { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}
export default function MovieCard({ movie, onClick }: MovieCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className="relative rounded-lg shadow-md overflow-hidden cursor-pointer w-44 transition-all transfrom hover:scale-105"
      onMouseEnter={(): void => setIsHovered(true)}
      onMouseLeave={(): void => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} 영화의 이미지`}
      />
      <div className="absolute right-2 top-2 rounded-md bg-black px-2 py-1 text-sm font-bold text-white">
        {movie.vote_average.toFixed(1)}
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col justify-center items-center text-white p-4">
          <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">{movie.overview}</p>
        </div>
      )}
    </div>
  );
};