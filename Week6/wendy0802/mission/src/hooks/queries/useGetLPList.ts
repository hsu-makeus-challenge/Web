import {useQuery} from "@tanstack/react-query";
import {PaginationDto} from "../../types/common";
import { getLPList } from "../../api/lp";
import { QUERY_KEY } from "../../constants/key";


function useGEtLPList({cursor, search, order, limit}:PaginationDto) {
    return useQuery({
        queryKey:[QUERY_KEY.lps,search, order],
        queryFn:()=>
            getLPList({
            cursor,
            search,
            order,
            limit,
        }),
        staleTime: 1000*60*5,
        gcTime:100*60*10,
        
    });
}

export default useGEtLPList;