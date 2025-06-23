
import { useEffect, useState, useMemo } from "react";
import MovieItem from "./MovieItem";
import type { Movie } from "../../types/movie";
import IsLoading from "../state/IsLoading";
import IsError from "../state/IsError";
import useCustomFetch from "../../hooks/UseCustomFetch";
import { useMovieStore } from "../../stores/movieStore";

type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

interface CategoryProps {
    category: Category;
    page: number;
    setTotalPages: (total: number) => void;
    searchKeyword?: string;
    searchOptions?: {
        language: string;
        includeAdult: boolean;
    };
}

const MovieList = ({ category, page, setTotalPages, searchKeyword, searchOptions }: CategoryProps) => {
    const trimmedKeyword = (searchKeyword ?? "").trim(); // 안전 처리
    const isSearching = trimmedKeyword.length > 0;

    const lang = searchOptions?.language || 'en';

    const endpoint = isSearching
        ? `search/movie?query=${encodeURIComponent(trimmedKeyword)}&language=${lang}&page=${page}`
        : `movie/${category}?language=${lang}&page=${page}`;

    const { data, isLoading, error } = useCustomFetch<{ results: Movie[]; total_pages: number }>(endpoint);



    useEffect(() => {
        if (data) {
            setTotalPages(data.total_pages);
        }
    }, [data, setTotalPages]);



    // useEffect(() => {
    //     const endpoint = `movie/${category}?language=ko-KR&page=${page}`;
    //     fetchMovies(endpoint);
    // }, [category, page]);

    const hasResults = (data?.results?.length ?? 0) > 0;

    const renderedMovies = useMemo(() => {
        if (!data?.results) return null;
        console.log(data.results)
        return data.results.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
        ));
    }, [data?.results]);

    //성인 콘텐츠 필터링
    const filteredResults = useMemo(() => {
        if (!data?.results) return [];
        return data.results.filter(movie => {
            return searchOptions?.includeAdult ? true : !movie.adult;
        });
    }, [data?.results, searchOptions]);

    return (
        <>
            {isLoading &&
                <div className="flex justify-center items-center min-h-[50vh] w-full">
                    <IsLoading /></div>
            }
            {
                error &&
                <div className="flex justify-center items-center min-h-[50vh] w-full">
                    <IsError /></div>
            }
            {!isLoading && !error && filteredResults.length > 0 && (
                <div className="flex justify-center">
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 cursor-pointer">
                        {filteredResults.map(movie => (
                            <MovieItem key={movie.id} movie={movie} />
                        ))}
                    </ul>
                </div>
            )}

            {!isLoading && !error && filteredResults.length === 0 && isSearching && (
                <div className="text-center text-gray-600 mt-10">검색 결과가 없습니다.</div>
            )}
        </>
    )
};

export default MovieList;