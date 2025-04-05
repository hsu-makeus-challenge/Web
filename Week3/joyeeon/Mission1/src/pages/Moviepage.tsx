import MovieList from "../components/moviescomp/MovieList";
import { useParams } from "react-router-dom";
import Slidebar from "../components/moviescomp/Slidebar";
import { useState } from "react";

const MoviePage = () =>{
    const {category} = useParams();
    //console.log(`params 값: ${category}`);

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);

    return(
        <main>
            <Slidebar page={page} setPage={setPage} totalPages={totalPages}/>
            <MovieList category={category} page={page} setTotalPages={setTotalPages}/>
        </main>
    )
}

export default MoviePage;