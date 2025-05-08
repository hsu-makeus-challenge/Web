import {useEffect, useState} from "react";
import LpCard from "../components/LpCard/LpCard.tsx";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList.ts";
import {PAGINATION_ORDER} from "../enums/common.ts";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList.tsx";
import SortOrderButtons from "../components/SortOrderButtons";

const HomePage = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data: lps, isFetching, hasNextPage, isLoading, fetchNextPage, isError } =
    useGetInfiniteLpList(10, "", sortOrder as PAGINATION_ORDER);

  // ref, inView
  // ref -> 특정한 HTML 요소 감시 가능
  // inView -> 그 요소가 화면에 보이면 true가 됨
  const {ref, inView} = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="flex flex-col bg-[#121212] min-h-screen text-white">
      <div className="mb-4 flex justify-end">
        <SortOrderButtons order={sortOrder} setOrder={setSortOrder} />
      </div>
      <main>

        {isError && <div>Error loading LPs</div>}
        <div className="relative mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {isLoading && <LpCardSkeletonList count={10} />}
          {lps?.pages
            ?.map((page) => page.data.data)
            ?.flat()
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
