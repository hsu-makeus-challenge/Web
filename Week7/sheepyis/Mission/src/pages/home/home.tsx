import { useState, useEffect } from "react";
import ListLp from "../../components/home/list-lp";
import { useInfiniteLpQuery } from "../../hooks/lp/useLpInfiniteQuery";
import { useInView } from "react-intersection-observer";
import Skeleton from "../../components/skeleton/skeleton";
import Add from "../../components/lp/add/add";
import AddModal from "../../components/lp/add/addModal";

const Home = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteLpQuery(order, 10);

  const { ref, inView } = useInView({ threshold: 0.1, rootMargin: "0px 0px 100px 0px" });

  console.log(data);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="w-full flex flex-col items-center py-[2vw] relative">
      <div className="w-[90%]">
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
      <Add onClick={() => setIsModalOpen(true)} />
      {isModalOpen && <AddModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Home;
