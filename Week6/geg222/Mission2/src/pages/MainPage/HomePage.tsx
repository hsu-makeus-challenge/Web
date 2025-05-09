import { useEffect, useState } from "react";
import useGetLpList from "../../hooks/queries/useGetLpList";
import SortButtons from "../../components/SortButtons";
import LpCard from "../../components/LpCard/LpCard";
import { PAGINATION_ORDER } from "../../enums/commons";
import useGetInfiniteLpList from "../../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  // const { data, isPending, isError } = useGetLpList({ order });
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
    refetch,
    isFetchingNextPage,
  } = useGetInfiniteLpList(10, search, order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error occurred</p>;

  return (
    <div>
      <SortButtons order={order} setOrder={setOrder} />
      <div className="grid grid-cols-5 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;
