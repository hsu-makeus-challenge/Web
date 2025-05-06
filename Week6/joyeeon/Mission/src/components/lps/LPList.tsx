import { useLpList } from "../../apis/lps"
import type { LP } from "../../apis/lps";
import LpItem from "./LPItem";
import { useState } from "react";

const LPList = () =>{
    const [order, setOrder ] = useState<"asc" | "desc">("desc");

    const {data: lpList, isLoading, error} = useLpList({
        cursor:0,
        limit:10, 
        search:"",
        order,
    });

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {String(error)}</div>;

    return(
        <>
            <article className="flex gap-2 text-xs py-5 justify-end">
                <button 
                onClick={() =>setOrder("asc")}
                className={`px-3 py-1 rounded-lg border border-gray-300 cursor-pointer 
                    ${order === "asc"
                        ? "bg-gray-700 text-white"
                        :  "bg-white text-gray-700"
                        
                    }
                `}>오래된 순</button>
                <button 
                onClick={() =>setOrder("desc")}
                className={`px-3 py-1 rounded-lg border border-gray-300 cursor-pointer 
                    ${order === "desc"
                        ? "bg-gray-700 text-white"
                        :  "bg-white text-gray-700"
                        
                    }
                    `}>최신 순</button>
            </article>
        
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
            gap-5 cursor-pointer">
                {lpList?.map((lp : LP) => (
            <LpItem key={lp.id} lp={lp} />
        ))}</ul>
        </>
    )
}

export default LPList