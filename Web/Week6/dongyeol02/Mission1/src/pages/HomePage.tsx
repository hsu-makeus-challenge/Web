import LpCard from "../components/LpCard/LpCard";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useEffect, useState } from "react";
import { PAGIMATION_ORDER } from "../enums/commons";

const HomePage = () => {
  const [search, setSerch] = useState("");
  const [order, setOrder] = useState(PAGIMATION_ORDER.asc);
  const { data, isPending, isError } = useGetLpList({ search, order });

  useEffect(() => {
    console.log("정렬 순서가 변경됨:", order);
  }, [order]);

  if (isPending) {
    return <div className="mt-20">Loading....</div>;
  }
  if (isError) {
    return <div className="mt-20">Error...</div>;
  }
  return (
    <div className="mt-20">
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setOrder(PAGIMATION_ORDER.asc)}
          className={`px-4 py-2 rounded border ${
            order === PAGIMATION_ORDER.asc ? "bg-black text-white" : "bg-white"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder(PAGIMATION_ORDER.desc)}
          className={`px-4 py-2 rounded border ${
            order === PAGIMATION_ORDER.desc ? "bg-black text-white" : "bg-white"
          }`}
        >
          최신순
        </button>
      </div>
      <input value={search} onChange={(e) => setSerch(e.target.value)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
