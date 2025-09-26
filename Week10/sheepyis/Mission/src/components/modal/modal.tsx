import React from "react";
import type { Movie } from "../../types/movie";

interface ModalProps {
    movie: Movie;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ movie, onClose }) => {
    return (
        <div className="w-full h-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-md w-[70%] h-[65%] overflow-y-auto relative">
                <button className="absolute top-[1vw] right-[2vw] text-white text-xl z-50" onClick={onClose}>x</button>

                <div className="relative h-[30%] w-full overflow-hidden">
                    <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt="backdrop" className="w-full h-full object-cover" />
                    <div className="absolute bottom-[2vw] left-[1vw] text-white">
                        <p className="text-[2vw] font-bold">{movie.title}</p>
                        <p className="text-[1vw] opacity-80">{movie.original_title}</p>
                    </div>
                </div>

                <div className="h-[70%] p-[2vw] flex gap-[2vw]">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-[50%] h-auto rounded-md" />

                    <div className="flex flex-col text-[1vw]">
                        <div className="flex items-center gap-2 mb-2">
                            <p className="text-[1.5vw] font-bold text-blue-600">
                                {movie.vote_average.toFixed(1)}
                            </p>
                            <span className="text-gray-500">({movie.vote_count.toLocaleString()} 평가)</span>
                        </div>

                        <div className="flex flex-col gap-[1vw] text-[1vw]">
                            <div>
                                <span className="font-bold text-gray-600">개봉일</span>
                                <div>{movie.release_date}</div>
                            </div>

                            <div>
                                <span className="font-bold text-gray-600">인기도</span>
                                <div>{movie.popularity.toLocaleString()}</div>
                            </div>

                            <div>
                                <span className="font-bold text-gray-600">줄거리</span>
                                <p className="text-gray-800 leading-relaxed line-clamp-6">{movie.overview}</p>
                            </div>
                        </div>

                        <div className="mt-[2vw] flex gap-[1vw] py-[2vw]">
                            <a href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`} target="_blank" rel="noopener noreferrer" className="px-[1vw] py-[0.5vw] bg-gray-200 hover:bg-gray-300 text-[1vw] rounded cursor-pointer">
                                IMDb에서 검색
                            </a>
                            <button className="px-[1vw] py-[0.5vw] bg-blue-600 hover:bg-blue-700 text-white text-[1vw] rounded cursor-pointer" onClick={onClose}>
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
