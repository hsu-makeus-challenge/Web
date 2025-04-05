import axios from "axios";
import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { Movie } from "../../types/movie";
import useLoading from "../../hooks/UseLoading";
import IsLoading from "../state/IsLoading";
import IsError from "../state/IsError";

//type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

interface CategoryProps {
    category?:string;
    page:number;
    setTotalPages:(total:number) =>void;
}

const MovieList = ({category, page, setTotalPages} : CategoryProps) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const token = import.meta.env.VITE_TMDB_TOKEN;
    

    const fetchMovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        setMovies(data.results);
        setTotalPages(data.total_pages);
        console.log("받은 영화 목록:", data);
        console.log("현재 페이지:", page);
    };

    const { isLoading, error, execute } = useLoading(fetchMovies);

    useEffect(() => {
        if (!category) return;
        execute();
    }, [token, category, page]); 

    return (
        <>
        {isLoading &&
            <div className="flex justify-center items-center min-h-[50vh] w-full">
                <IsLoading/></div>
        }
        {
            error && 
            <div className="flex justify-center items-center min-h-[50vh] w-full">
                <IsError/></div>
        }
        {
            !isLoading && !error && (
                <div className="flex justify-center">
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
                        gap-5 cursor-pointer">
                            {movies?.map((movie) => (
                                <MovieItem key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                </div>
            )
        }
        </>
    )
};

export default MovieList;