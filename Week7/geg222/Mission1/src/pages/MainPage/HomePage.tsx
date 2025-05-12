import { useEffect, useState } from "react";
import SortButtons from "../../components/SortButtons";
import LpCard from "../../components/LpCard/LpCard";
import useGetInfiniteLpList from "../../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../../components/LpCard/LpCardSkeletonList";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import LpCreateModal from "../../components/LpCreateModal";

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

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  if (isPending) return <LoadingSpinner />;
  if (isError) return <p>Error occurred</p>;

  return (
    <div>
      <SortButtons order={order} setOrder={setOrder} />
      <div className="grid grid-cols-5 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
        {isFetching && <LpCardSkeletonList count={5} />}
      </div>
      <div ref={ref} className="h-2"></div>

      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-green-500 text-white text-2xl flex items-center justify-center shadow-md"
      >
        +
      </button>

      {isOpen && <LpCreateModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default HomePage;
