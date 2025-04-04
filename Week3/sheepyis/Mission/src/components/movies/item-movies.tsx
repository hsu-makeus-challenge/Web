import { useNavigate } from "react-router-dom";
import { Movie } from "../../types/movie";
import MovieOverlay from "./movieOverlay";

interface ItemProps {
    movie: Movie;
}
  
const ItemMovies = ({ movie }: ItemProps) => {
    const navigate = useNavigate();
    const movieId = movie.id;

    const handleMovieDetailClick = () => {
        if (!movieId) return;
        navigate(`/movies/${movieId}`);
    }

    return (
        <div onClick={handleMovieDetailClick} className="relative group overflow-hidden rounded-[0.8vw] cursor-pointer">
            <img 
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                alt={movie.title} 
                className="w-full h-full rounded-[0.8vw]"
            />
            
            <MovieOverlay movie={movie} />
        </div>
    )
};

export default ItemMovies;
