import { useLpList } from "../../apis/lps"
import type { LP } from "../../apis/lps";
import LpItem from "./LPItem";
import { useState } from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LpSkeletonItem from "./LpSkeletonItem";

const LPList = () => {
    const [order, setOrder] = useState<"asc" | "desc">("desc");

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useLpList({
        limit: 10,
        search: "",
        order,
    });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {String(error)}</div>;

    const lpItems = data?.pages.flatMap((page) => page.items) ?? [];

    return (
        <>


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

                {isFetchingNextPage &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <LpSkeletonItem key={`skeleton-${index}`} />
                    ))}

            </ul>


            <div ref={ref} className="h-4">    </div>


        </>
    )
}

export default LPList