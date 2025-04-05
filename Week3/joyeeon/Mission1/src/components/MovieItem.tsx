import { Movie } from "../types/movie";

interface MovieItemProps {
    movie: Movie;
}

const MovieItem = ({movie} : MovieItemProps) =>{
    const imgURL : string = 'https://image.tmdb.org/t/p/w500'

    return(
        <li key={movie.id} className="relative w-32 group aspect-[2/3] rounded-md overflow-hidden">
            {/* <h3>{movie.title}</h3> */}
            <img 
            src={`${imgURL}${movie.poster_path}`}
            alt="포스터" 
            className="w-full block group-hover:blur-md"
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