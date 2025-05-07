import ListMovies from "../../components/movies/list-movies";

const Popular = () => {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <ListMovies url="/popular" />
        </div>
    )
}

export default Popular;