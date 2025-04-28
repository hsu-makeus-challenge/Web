import ListMovies from "../../components/movies/list-movies";

const NowPlaying = () => {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <ListMovies url="/now_playing" />
        </div>
    )
}

export default NowPlaying;