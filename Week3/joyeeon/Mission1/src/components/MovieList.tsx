import axios from "axios";
import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { Movie } from "../types/movie";

const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const token = import.meta.env.VITE_TMDB_TOKEN;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axios.get(
                    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                setMovies(data.results);          
                console.log("받은 영화 목록:", data.results); 
            } catch (error) {
                console.error("영화 불러오기 실패:", error);
            }
        };

        fetchMovies();
    }, [token]);

    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
        gap-5 justify-center cursor-pointer">
            {movies?.map((movie) => (
                <MovieItem key={movie.id} movie={movie}/>
            ))}

        </ul>
    )
};

export default MovieList;