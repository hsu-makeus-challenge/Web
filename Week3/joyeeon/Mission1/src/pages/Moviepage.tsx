import MovieList from "../components/moviescomp/MovieList";
import { useParams ,Navigate } from "react-router-dom";
import Slidebar from "../components/moviescomp/Slidebar";
import { useState } from "react";

type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

const MoviePage = () =>{
    const {category} = useParams();
    //console.log(`params 값: ${category}`);

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);

    const validCategories: Category[] = ['popular', 'top_rated', 'upcoming', 'now_playing'];

    // 2. category 값이 유효하지 않다면 에러 처리 (ex. 잘못된 경로로 접근한 경우)
    if (!category || !validCategories.includes(category as Category)) {
        return <h3>잘못된 경로입니다.</h3>;
        
    }

    return(
        <main>
            <Slidebar page={page} setPage={setPage} totalPages={totalPages}/>
            <MovieList category={category as Category} page={page} setTotalPages={setTotalPages}/>
        </main>
    )
}

export default MoviePage;