import React from "react";
import type { Movie } from "../../types/movie";

interface ItemMovieProps {
    movie: Movie;
    onClick: (movie: Movie) => void;
}

const ItemMovie: React.FC<ItemMovieProps> = ({ movie, onClick }) => {
    return (
        <div className="border rounded relative cursor-pointer" onClick={() => onClick(movie)}>
            <div className="px-[1vw] py-[0.5vw] bg-blue-600 text-white font-bold text-[1vw] absolute top-[1vw] right-[1vw] rounded">{movie.vote_average.toFixed(1)}</div>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-[65%] mb-[0.5vw] rounded-t" />
            <div className="p-[1vw] flex flex-col gap-[1vw]">
                <p className="text-[1.2vw] font-bold line-clamp-1">{movie.title}</p>
                <p className="text-[0.8vw] text-gray-600">{movie.release_date}</p>
                <p className="text-[0.8vw] text-gray-600 line-clamp-3">
                    {movie.overview}
                </p>
            </div>
        </div>
    );
};

export default ItemMovie;
