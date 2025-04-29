import type { Credit } from "../../types/credit";
import { useParams } from "react-router-dom";
import CreditItem from "./CreditItem";
import useCustomFetch from "../../hooks/UseCustomFetch";
import IsLoading from "../state/IsLoading";



const CastingList = () => {
    const { id } = useParams();
    const endpoint = id ? `${id}/credits?language=ko-KR` : null;
    const {data} = useCustomFetch<{cast:Credit[]}>(endpoint);

    if (!data?.cast || data.cast.length === 0) {
        return <IsLoading />
    }


    return (
        <article>
            <h2 className="text-xl mb-10 p-5 font-bold">감독/출연</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
                        gap-5">
                {data?.cast?.map((credit) => (
                    <CreditItem key={credit.cast_id} credit={credit} />
                ))}
            </ul>
        </article>
    )
}

export default CastingList