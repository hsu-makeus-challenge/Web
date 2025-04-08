import { Credit } from "../../types/credit";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreditItem from "./CreditItem";



const CastingList = () => {
    const { id } = useParams();
    const [credits, SetCredits] = useState<Credit[]>([]);
    const token = import.meta.env.VITE_TMDB_TOKEN;

    useEffect(() => {
        const fetchCredit = async () => {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`,
                {
                    headers: {
                        Authorization: token,
                    },
                });
            SetCredits(data.cast);
            console.log("받아온 크레딧 데이터", data.cast);
        }
        if (id) fetchCredit();
    }, [id]);


    return (
        <article>
            <h2 className="text-xl mb-10 p-5 font-bold">감독/출연</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
                        gap-5 cursor-pointer">
                {credits?.map((credit) => (
                    <CreditItem key={credit.cast_id} credit={credit} />
                ))}
            </ul>
        </article>
    )
}

export default CastingList