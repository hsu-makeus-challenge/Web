import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieResponse, MovieFilters } from "../types/movie";

export default function HomePage() {
    const [filters, setFilters] = useState<MovieFilters>({
        query: "어벤져스",
        include_adult: false,
        language: "ko-KR",
    });

    const axiosRequestConfig = useMemo((): { params: MovieFilters} => (
        {
            params: filters,
        }),
        [filters],
    );

    const { data, error, isLoading } = useFetch<MovieResponse>("/search/movie", axiosRequestConfig);

    const handleMovieFilters = useCallback((filters: MovieFilters): void => {
        setFilters(filters);
    }, [setFilters]);

    if(error) {
        return <div>{error}</div>;
    }

    return (
        <div className='container'>
            <MovieFilter onChange={handleMovieFilters} />
            {isLoading ? (
                <div>로딩중입니다.</div>
            ) : (
                <MovieList movies={data?.results || []} />
            )}
        </div>
    )
}

// 검색 필터
// 영화 무비