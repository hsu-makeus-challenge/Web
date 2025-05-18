import { useLpList } from "../../apis/lps"
import type { LP } from "../../apis/lps";
import LpItem from "./LPItem";
import { useState } from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LpSkeletonItem from "./LpSkeletonItem";
import SearchInput from "../searchs/SearchInput";
import useDebounce from "../../hooks/state/useDebounce";
import useThrottle from "../../hooks/state/useThrottle";

const LPList = () => {
    //const [inputValue, setInputValue] = useState("");
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [order, setOrder] = useState<"asc" | "desc">("desc");

    const [searchInput, setSearchInput] = useState("");
    const debouncedSearch = useDebounce(searchInput, 300); // 디바운스된 검색어 상태

    useEffect(() => {
        setSearchKeyword(debouncedSearch); // 실제 검색어 상태
    }, [debouncedSearch]);


    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useLpList({
        limit: 10,
        search: searchKeyword,
        order,
    });

    const { ref, inView } = useInView();

    const throttledFetchNextPage = useThrottle(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, 1000);

    // useEffect(() => {
    //     if (inView && hasNextPage && !isFetchingNextPage) {
    //         fetchNextPage();
    //     }
    // }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);


    useEffect(() => {
        if (inView) {
            throttledFetchNextPage();
        }
    }, [inView, throttledFetchNextPage]);

    // if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {String(error)}</div>;

    const lpItems = data?.pages.flatMap((page) => page.items) ?? [];

    return (
        <main className="w-full min-h-screen h-fit px-10 justify-center">

            <SearchInput
                value={searchInput}
                onChange={setSearchInput}
                onSearch={(keyword) => setSearchKeyword(keyword)}
            />

            <article className="flex gap-2 text-xs py-5 justify-end">
                <button
                    onClick={() => setOrder("asc")}
                    className={`px-3 py-1 rounded-lg border border-gray-300 cursor-pointer 
                    ${order === "asc"
                            ? "bg-gray-700 text-white"
                            : "bg-white text-gray-700"

                        }
                `}>오래된 순</button>
                <button
                    onClick={() => setOrder("desc")}
                    className={`px-3 py-1 rounded-lg border border-gray-300 cursor-pointer 
                    ${order === "desc"
                            ? "bg-gray-700 text-white"
                            : "bg-white text-gray-700"

                        }
                    `}>최신 순</button>
            </article>


            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
                gap-5 cursor-pointer">
                {lpItems.map((lp: LP) => (
                    <LpItem key={lp.id} lp={lp} />
                ))}

                {(isFetchingNextPage || isLoading) &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <LpSkeletonItem key={`skeleton-${index}`} />
                    ))}

            </ul>


            <div ref={ref} className="h-4">    </div>


        </main>
    )
}

export default LPList