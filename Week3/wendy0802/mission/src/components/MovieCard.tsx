import React, { useState } from "react";
import { Movie } from "../../types/movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`relative rounded-md shadow-md overflow-hidden transform 
        transition-transform duration-200 cursor-pointer 
        ${isHovered ? "scale-105" : ""
      }`}
      onClick={() => navigate(`/movies/now_playing/${movie.id}`)} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} Poster`}
        className="w-full h-full object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-70 p-4 text-white flex flex-col justify-end">
          <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
          <p className="text-sm line-clamp-4">{movie.overview}</p>
        </div>
      )}
    </div>
  );
}
