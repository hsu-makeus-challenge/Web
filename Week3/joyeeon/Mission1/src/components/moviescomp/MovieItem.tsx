import { Movie } from "../../types/movie";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

interface MovieItemProps {
    movie: Movie;
}

const MovieItem = ({movie} : MovieItemProps) =>{
    const imgURL : string = 'https://image.tmdb.org/t/p/w500'
    const navigate = useNavigate();

    const handleNavigate = (id:number) => (e:MouseEvent<HTMLLIElement>) => {
            navigate(`/movies/detail/${id}`);
        };

    return(
        <li key={movie.id} onClick={handleNavigate(movie.id)} className="relative w-32 group aspect-[2/3] rounded-md overflow-hidden">
            {/* <h3>{movie.title}</h3> */}
            <img 
            src={`${imgURL}${movie.poster_path}`}
            alt="포스터" 
            className="w-full h-full object-cover block group-hover:blur-md"
            />

            
            <div
                className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100
                text-sm/7 text-white flex flex-col items-center justify-center p-4"
                >
                <h3 className="text-sm">{movie.title}</h3>
                <div className="text-xs  overflow-hidden text-ellipsis"
                style={{
                    display: "-webkit-box",
                    WebkitLineClamp:3,
                    WebkitBoxOrient:"vertical"
                }}>{movie.overview}</div>
            </div>
        </li>
    )
};

export default MovieItem;