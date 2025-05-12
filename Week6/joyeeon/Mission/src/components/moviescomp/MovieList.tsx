
import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import type { Movie } from "../../types/movie";
import IsLoading from "../state/IsLoading";
import IsError from "../state/IsError";
import useCustomFetch from "../../hooks/UseCustomFetch";

type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

interface CategoryProps {
    category:Category;
    page:number;
    setTotalPages:(total:number) =>void;
}

const MovieList = ({category, page, setTotalPages} : CategoryProps) => {
    const endpoint = `${category}?language=ko-KR&page=${page}`;
    const { data, isLoading, error } = useCustomFetch<{ results: Movie[]; total_pages: number }>(endpoint);

    useEffect(() => {
        if (data) {
            setTotalPages(data.total_pages);
        }
    }, [data, setTotalPages]);


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
                            {data?.results?.map((movie) => (
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