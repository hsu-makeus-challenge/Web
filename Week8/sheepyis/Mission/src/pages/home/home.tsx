import { useState, useEffect } from "react";
import ListLp from "../../components/home/list-lp";
import { useInfiniteLpQuery } from "../../hooks/lp/useLpInfiniteQuery";
import { useInView } from "react-intersection-observer";
import Skeleton from "../../components/skeleton/skeleton";
import Add from "../../components/lp/add/add";
import AddModal from "../../components/lp/add/addModal";
import useThrottle from "../../hooks/useThrottle";
import SortButton from "../../components/search/sortButton";

const Home = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteLpQuery(order, 10);

  const { ref, inView } = useInView({ threshold: 0.1, rootMargin: "0px 0px 100px 0px" });

  const throttledFetchNext = useThrottle(() => {
    if (hasNextPage) fetchNextPage();
  }, 3000);

  useEffect(() => {
    if (inView) {
      throttledFetchNext();
    }
  }, [inView, throttledFetchNext]);

  return (
    <div className="w-full flex flex-col items-center py-[2vw] relative">
      <div className="w-[90%]">
        <SortButton order={order} setOrder={setOrder} />

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
      <Add onClick={() => setIsModalOpen(true)} />
      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Home;
