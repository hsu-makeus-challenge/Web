import MovieList from "../components/moviescomp/MovieList";
import { useParams, Navigate } from "react-router-dom";
import Slidebar from "../components/moviescomp/Slidebar";
import { useState } from "react";
import SearchComp from "../components/searchMovies/SearchComp";
import useDebounce from "../hooks/state/useDebounce";
import { useEffect } from "react";
import { useCallback } from "react";

type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

const MoviePage = () => {
    const { category } = useParams();
    //console.log(`params 값: ${category}`);

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchOptions, setSearchOptions] = useState({ language: 'ko-KR', includeAdult: false });

    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [searchInput, setSearchInput] = useState("");
    const debouncedSearch = useDebounce(searchInput, 300); // 디바운스된 검색어 상태

    useEffect(() => {
        setSearchKeyword(debouncedSearch); // 실제 검색어 상태
    }, [debouncedSearch]);

    const validCategories: Category[] = ['popular', 'top_rated', 'upcoming', 'now_playing'];

    // 2. category 값이 유효하지 않다면 에러 처리 (ex. 잘못된 경로로 접근한 경우)
    if (!category || !validCategories.includes(category as Category)) {
        return <h3>잘못된 경로입니다.</h3>;
    }

    const handleInputChange = useCallback((value: string) => {
        setSearchInput(value);
    }, []);

    const handleSearch = useCallback((keyword: string, options: { language: string; includeAdult: boolean }) => {
        setSearchKeyword(keyword);
        setSearchOptions(options);
    }, []);

    return (
        <main className="flex flex-col items-center">
            <SearchComp
                value={searchInput}
                onChange={handleInputChange}
                onSearch={handleSearch}
            />
            <Slidebar page={page} setPage={setPage} totalPages={totalPages} />
            <MovieList
                category={category as Category}
                page={page}
                setTotalPages={setTotalPages}
                searchKeyword={searchKeyword}
                searchOptions={searchOptions}
            />
        </main>
    )
}

export default MoviePage;