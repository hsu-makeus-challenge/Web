import { JSX } from "react";
import { MovieDetail } from "../../../types/movie";

const MovieDetailBackdrop = ({ movie }: { movie: MovieDetail }): JSX.Element => (
  <div className="relative w-full h-60 mb-4 flex items-end">
    <img
      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      alt={movie.title}
      className="w-full h-full object-cover opacity-60 absolute top-0 left-0 z-0 rounded-lg"
    />
    <div className="relative z-10 flex items-end p-4">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="w-32 h-48 object-cover rounded-lg shadow-lg mr-4"
      />
      <div>
        <h1 className="text-2xl font-bold text-black">{movie.title}</h1>
        <p className="text-gray-600 text-sm">{movie.original_title}</p>
        <div className="flex items-center mt-2">
          <span className="text-blue-600 font-bold text-lg">{movie.vote_average.toFixed(1)}</span>
          <span className="ml-2 text-gray-500 text-sm">({movie.vote_count} 평가)</span>
        </div>
      </div>
    </div>
  </div>
);

export default MovieDetailBackdrop;