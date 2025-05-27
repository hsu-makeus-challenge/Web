import React from "react";
import { MovieDetails } from "../types/movie";

interface movieInfoProprs {
  moviedetail: MovieDetails;
}

const MovieInfo = ({ moviedetail }: movieInfoProprs): Element => {
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w200${moviedetail.backdrop_path}`}
        alt={"wrong"}
        className="w-full h-110 p-4 rounded-4xl m-4"
      />
      <div className="absolute">
        <div
          className="relative bottom-100 left-10 bg-gradient-to-t
           from-black/50 to-transparent backdrop-blur-md w-150"
        >
          <div className="font-bold text-4xl pb-3.5">{moviedetail.title}</div>
          <div>평균:{moviedetail.vote_average}</div>
          <div>{moviedetail.release_date.slice(0, 4)}</div>
          <div>{moviedetail.runtime}분</div>
          <div className="text-2xl pt-3.5 pb-3.5 italic">
            {moviedetail.tagline}
          </div>
          <div>{moviedetail.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
