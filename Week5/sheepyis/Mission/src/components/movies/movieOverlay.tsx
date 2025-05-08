import { Movie } from "../../types/movie";

interface OverlayProps {
    movie: Movie;
}

const MovieOverlay = ({ movie }: OverlayProps) => {
    return (
        <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity text-white flex flex-col justify-center items-center p-[1vw] text-center gap-[1vw]">
            <p className="text-[1.2vw] font-bold max-w-[80%]">{movie.title}</p>
            <p className="text-[1vw] line-clamp-3 max-w-[80%] leading-[1.8]">{movie.overview}</p>
        </div>
    );
};

export default MovieOverlay;
