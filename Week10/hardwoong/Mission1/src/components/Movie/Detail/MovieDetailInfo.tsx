import { JSX } from "react";
import { MovieDetail } from "../../../types/movie";

const MovieDetailInfo = ({ movie }: { movie: MovieDetail }): JSX.Element => (
  <div>
    <p className="text-sm mt-1">개봉일: {movie.release_date}</p>
    <p className="text-sm mt-1">인기도: {movie.popularity}</p>
    <p className="text-sm mt-1">장르: {movie.genres?.map(g => g.name).join(', ')}</p>
    {movie.tagline && <p className="italic mt-2 text-gray-500">{movie.tagline}</p>}
  </div>
);

export default MovieDetailInfo;