
import { Detail } from "../types/details";
import { useParams } from "react-router-dom";
import DetailPanel from "../components/details/DetailPanel";
import CastingList from "../components/details/CastingList";
import IsLoading from "../components/state/IsLoading";
import IsError from "../components/state/IsError";
import useCustomFetch from "../hooks/UseCustomFetch";

const DetailMoviePage = () => {
    const { id } = useParams();
    const endpoint = id ? `${id}?language=ko-KR` : null;

    const { data: detail, isLoading, error } = useCustomFetch<Detail>(endpoint);



    if (isLoading) {
        return (
            <main className="bg-black text-gray-50 h-full">
                <div className="h-screen flex items-center justify-center">
                    <IsLoading />
                </div>
            </main>
        );
    }

    if (error || !detail) {
        return (
            <main className="bg-black text-gray-50 h-full">
                <div className="h-screen flex items-center justify-center">
                    <IsError />
                </div>
            </main>
        );
    }

    return (
        <main className="bg-black text-gray-50 h-full">
            <DetailPanel detail={detail} />
            <CastingList />
        </main>
    );
}

export default DetailMoviePage;