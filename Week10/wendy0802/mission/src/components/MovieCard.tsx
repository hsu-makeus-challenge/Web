import { useState } from "react";

interface MovieCardProps {
  movie: any;
  onClick?: () => void; // 클릭 시 동작을 부모에서 결정
}

export default function MovieCard({ movie, onClick }: MovieCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-md shadow-md overflow-hidden transform 
        transition-transform duration-200 cursor-pointer 
        ${isHovered ? "scale-105" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} Poster`}
        className="w-full h-full object-cover"
      />
      <div className="absolute right-2 top-2 rounded-md bg-blue-500 px-2 py-1 text-sm font-bold text-white shadow">
        {movie.vote_average?.toFixed(1)}
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-70 p-4 text-white flex flex-col justify-end">
          <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
          <p className="text-sm line-clamp-4">{movie.overview}</p>
        </div>
      )}
    </div>
  );
}