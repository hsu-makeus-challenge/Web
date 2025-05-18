import { useState, useEffect } from "react";
import ListLp from "../../components/home/list-lp";
import { useInView } from "react-intersection-observer";
import Skeleton from "../../components/skeleton/skeleton";
import { useInfiniteLpQuery } from "../../hooks/lp/useLpInfiniteQuery";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [searchField, setSearchField] = useState<"title" | "tag">("title");
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteLpQuery(order, 10, debouncedSearchQuery, searchField);

    const { ref, inView } = useInView({ threshold: 0.1, rootMargin: "0px 0px 100px 0px" });

    useEffect(() => {
        console.log("디바운스 검색어:", debouncedSearchQuery);
    }, [debouncedSearchQuery]);

    useEffect(() => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, fetchNextPage]);
    
    return (
        <div className="w-full flex flex-col items-center py-[2vw] relative">
            <div className="w-[90%]">
                <div className="flex mb-[2vw] gap-[1vw] text-white items-center">
                    <input className="w-[60%] h-[3vw] border-white border-[0.1vw] rounded text-[1vw] px-[1vw]" placeholder="검색어를 입력하세요" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <select value={searchField} onChange={(e) => setSearchField(e.target.value as "title" | "tag")} className="h-[3vw] text-[1vw] rounded bg-gray-700 text-white border border-white">
                        <option value="title">제목</option>
                        <option value="tag">태그</option>
                    </select>
                </div>

                <div className="flex justify-end mb-[2vw] gap-[1vw] text-[1vw]">
                    <button 
                        onClick={() => setOrder("asc")}
                        className={`px-[1vw] py-[0.5vw] rounded cursor-pointer ${
                        order === "asc" ? "bg-white text-black" : "bg-gray-700 text-white"
                        }`}
                    >
                        오래된 순
                    </button>
                    <button
                        onClick={() => setOrder("desc")}
                        className={`px-[1vw] py-[0.5vw] rounded cursor-pointer ${
                        order === "desc" ? "bg-white text-black" : "bg-gray-700 text-white"
                        }`}
                    >
                        최신순
                    </button>
                </div>

                {data?.pages.map((page, idx) => (
                    <ListLp key={idx} data={page.data} />
                ))}

                {isFetchingNextPage && 
                    <div className="grid grid-cols-5 gap-[1vw] mb-[1vw]">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton key={i} />
                        ))}
                    </div>
                }
            <div ref={ref} className="h-[100px]" />
        </div>
    </div>
  );
};

export default Search;
