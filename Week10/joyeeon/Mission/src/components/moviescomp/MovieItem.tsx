import type { Movie } from "../../types/movie";
import { useModalStore } from "../../stores/modalStore";
import DetailModal from "../detailModals/DetatilModal";
import React from "react";

interface MovieItemProps {
    movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
    const imgURL: string = 'https://image.tmdb.org/t/p/w500'
    const openModal = useModalStore((state) => state.openModal); // 모달 열기

    const handleClick = () => {
        openModal(movie.id);
    };

    return (
        <>
            <li key={movie.id} onClick={handleClick} className="relative w-32 group aspect-[2/3] rounded-md overflow-hidden">
                {/* <h3>{movie.title}</h3> */}
                <img
                    src={`${imgURL}${movie.poster_path}`}
                    alt="포스터"
                    className="w-full h-full object-cover block group-hover:blur-md"
                />


                <div
                    className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100
                text-sm/7 text-white flex flex-col items-center justify-center p-4"
                >
                    <h3 className="text-sm">{movie.title}</h3>
                    <div className="text-xs  overflow-hidden text-ellipsis"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical"
                        }}>{movie.overview}</div>
                </div>
            </li>

            <DetailModal/>
        </>

    )
};

//React.memo로 감싸서 동일한 props일 경우 리렌더링 방지
export default React.memo(MovieItem);