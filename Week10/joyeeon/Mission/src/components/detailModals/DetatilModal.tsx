import Modal from 'react-modal';
import type { Detail } from '../../types/details';
import { customModalStyles } from "../../styles/CustomModal";
Modal.setAppElement('#root');
import { useModalStore } from '../../stores/modalStore';
import useCustomFetch from '../../hooks/UseCustomFetch';
import { ImCross } from "react-icons/im";

const DetailModal = () => {
    const { isOpen, closeModal, movieId } = useModalStore();
    const endpoint = movieId ? `movie/${movieId}?language=ko-KR` : null;
    const { data: detail, isLoading, error } = useCustomFetch<Detail>(endpoint);


    const imgURL: string = 'https://image.tmdb.org/t/p/w1280'


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => closeModal()}
            contentLabel='detail modal'
            style={customModalStyles}
        >
            <button className='z-50 absolute top-2 right-5 text-black'
                onClick={() => closeModal()}
            ><ImCross /></button>
            <div className="relative text-white p-0 overflow-hidden">

                <div className="relative w-full h-[300px] mb-5">
                    {/* 백드롭 이미지 (배경) */}
                    <img
                        src={`${imgURL}${detail?.backdrop_path}`}
                        alt="background"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    {/* 텍스트 위에 올라오도록 */}
                    <div className="relative z-10 flex flex-col h-full items-start justify-end text-white text-center px-4">
                        <h2 className="text-2xl font-bold text-white  mb-2">{detail?.title}</h2>
                    </div>
                </div>
                <div className="relative z-10 flex gap-6 p-6 ">
                    {/* 포스터 */}
                    <img
                        src={`${imgURL}${detail?.poster_path}`}
                        alt="poster"
                        className="w-40 h-80 rounded-md shadow-lg"
                    />

                    {/* 텍스트 영역 */}
                    <div className="flex-1 text-black">

                        <h4>개봉일</h4>
                        <div className="flex items-center gap-3 text-sm mb-3">
                            {/* <span className="text-blue-400 font-bold">{detail.vote_average.toFixed(1)}</span> */}
                            <span>|</span>
                            <span>{detail?.release_date}</span>
                        </div>

                        <h4 className="text-md font-semibold mb-2">줄거리</h4>
                        <p className="text-[8px] leading-relaxed textblack">
                            {detail?.overview}
                        </p>

                        {/* 버튼 */}
                        <div className="mt-6 flex gap-2">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
                            >
                                IMDb에서 검색
                            </a>
                            <button
                                onClick={() => closeModal()}
                                className="bg-gray-500 text-white text-sm px-4 py-2 rounded hover:bg-gray-600"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </Modal>
    )
}

export default DetailModal;