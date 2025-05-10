import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Movie } from "../../types/movie";
import { Credit } from "../../types/credit";
import Spinner from "../../components/spinner/spinner";
import Error from "../../components/error/error";
import Banner from "../../components/movies/movieDetail/banner";
import ListCredit from "../../components/movies/movieDetail/list-credit";

const MovieDetail = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const { data, loading, error } = useFetch<Movie>(`/${movieId}?language=ko`);
    const { data: creditData, loading: creditLoading, error: creditError } = useFetch<Credit>(`/${movieId}/credits`);

    if (loading || creditLoading) return <Spinner />
    if (error || !data || creditError || !creditData) return <Error />;

    return (
        <div className="w-full min-h-screen flex items-center flex-col bg-blue-950">
            <Banner data={data} />

            <ListCredit data={creditData}/>
        </div>
    )
}

export default MovieDetail;