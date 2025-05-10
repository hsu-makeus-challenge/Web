import ListMovies from "../../components/movies/list-movies";

const UpComing = () => {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <ListMovies url="/upcoming" />
        </div>
    )
}

export default UpComing;