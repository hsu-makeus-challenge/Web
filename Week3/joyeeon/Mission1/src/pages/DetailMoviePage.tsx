import axios from "axios";
import { Detail } from "../types/details";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailPanel from "../components/details/DetailPanel";
import CastingList from "../components/details/CastingList";
import IsLoading from "../components/state/IsLoading";
import IsError from "../components/state/IsError";

const DetailMoviePage = () =>{
    const {id} = useParams();
    const [detail, setDetail] = useState<Detail | null>(null);
    const [error, setError] = useState<string | null>(null);
    const token = import.meta.env.VITE_TMDB_TOKEN;
    
    useEffect(() =>{
        const fetchDetailMovies = async () =>{
            try {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                setDetail(data);
                setError(null); // 성공 시 에러 초기화
                console.log("받아온 상세 데이터", data);
            } catch (err) {
                console.error("영화 상세 정보 불러오기 실패", err);
                setError("영화 정보를 불러오는 데 실패했습니다.");
            }
        };

        if (id) fetchDetailMovies();
    }, [id]);

    return(
        <main className="bg-black text-gray-50 w-screen h-full">
        {error ? (
            <div className="text-center py-10 text-red-400 text-lg h-screen">
                <IsError />
            </div>
        ) : detail ? (
            <>
                <DetailPanel detail={detail} />
                <CastingList />
            </>
        ) : (
            <div className="h-screen">
                <IsLoading />
            </div>
        )}
    </main>
    )
}

export default DetailMoviePage;