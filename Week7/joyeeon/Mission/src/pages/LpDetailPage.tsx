import { useParams } from "react-router-dom";
import useLPDetailFetch from "../hooks/UseLpDetailFetch";
import type { LpDetail } from "../types/lpdetails";
import LpDetailComp from "../components/lps/LpDetailComp";
import { useQuery } from "@tanstack/react-query";
import { fetchLpDetail } from "../apis/lps";

const LPDetailPage = () =>{
    const {id} = useParams();
    const endpoint = `/lps/${id}`;
    const { data, isLoading, error } = useQuery<LpDetail>({
        queryKey: ["lpDetail", id],
        queryFn: () => fetchLpDetail(id!), // id는 string | undefined → non-null 단언
        enabled: !!id,
    });
    //const { data, isLoading, error } = useLPDetailFetch<LpDetail>(endpoint);

    if (isLoading) return <p>로딩 중...</p>;
    if (error || !data) return <p>오류 발생</p>;

    return(
        <main className="w-full h-full flex justify-center items-center ">
            
                <LpDetailComp detail={data}/>
            
        </main>
    )
}

export default  LPDetailPage;