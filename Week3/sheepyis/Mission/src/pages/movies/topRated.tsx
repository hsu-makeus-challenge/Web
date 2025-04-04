import ListMovies from "../../components/movies/list-movies";

const TopRated = () => {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <ListMovies url="/top_rated" />
        </div>
    )
}

export default TopRated;