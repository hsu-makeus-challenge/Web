import ItemMovie from "./item-movie";
import type { Movie } from "../../types/movie";

interface ListMovieProps {
    data: Movie[];
    onClick: (movie: Movie) => void;
}

const ListMovie: React.FC<ListMovieProps> = ({ data, onClick }) => {
    if (!data || data.length === 0) {
        return <p className="text-center mt-[2vw] text-[1vw]">영화 데이터가 없습니다.</p>;
    }

    return (
        <div className="w-[80%] grid grid-cols-4 gap-[1vw]">
            {data.map((movie) => (
                <ItemMovie key={movie.id} movie={movie} onClick={onClick} />
            ))}
        </div>
    );
};

export default ListMovie;