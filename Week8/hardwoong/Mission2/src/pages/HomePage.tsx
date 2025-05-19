import {useEffect, useState} from "react";
import LpCard from "../components/LpCard/LpCard.tsx";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList.ts";
import {PAGINATION_ORDER} from "../enums/common.ts";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList.tsx";
import SortOrderButtons from "../components/SortOrderButtons.tsx";
import useDebounce from "../hooks/queries/useDebounce.ts";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay.ts";
import useThrottle from "../hooks/queries/useThrottle";

const HomePage = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

  const { data: lps, isFetching, hasNextPage, isLoading, fetchNextPage, isError } =
    useGetInfiniteLpList(10, debouncedSearch, sortOrder as PAGINATION_ORDER);

  // ref, inView
  // ref -> 특정한 HTML 요소 감시 가능
  // inView -> 그 요소가 화면에 보이면 true가 됨
  const {ref, inView} = useInView();

  const throttledFetchNextPage = useThrottle(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, 3000);

  useEffect(() => {
    if (inView) {
      throttledFetchNextPage();
    }
  }, [inView, throttledFetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", throttledFetchNextPage);
    return () => window.removeEventListener("scroll", throttledFetchNextPage);
  }, [throttledFetchNextPage]);

  return (
    <div className="flex flex-col bg-[#121212] min-h-screen text-white">
      <div className="flex items-center gap-2 mb-4">
        <input className="flex-grow p-2 border border-gray-300 rounded-md" value={search} placeholder="검색어를 입력해주세요..." onChange={(e) => setSearch(e.target.value)} />
        <SortOrderButtons order={sortOrder} setOrder={setSortOrder} />
      </div>
      <main>

        {isError && <div>Error loading LPs</div>}
        <div className="relative mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {isLoading && <LpCardSkeletonList count={10} />}
          {lps?.pages
            ?.flatMap((page) => page.data.data)
            ?.map((lp) => <LpCard
              key={lp.id}
              id={lp.id}
              title={lp.title}
              thumbnail={lp.thumbnail}
              createdAt={lp.createdAt}
              likes={lp.likes}
            />)
          }
          {isFetching && <LpCardSkeletonList count={10} />}
        </div>
      </main>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;

