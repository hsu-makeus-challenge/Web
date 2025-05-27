import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";


const HomePage = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isError } = useGetLpList({
    cursor: 0,
    search: "",
    limit: 30,
    order: sortOrder,
  });

  return (
    <div className="flex flex-col bg-[#121212] min-h-screen text-white">
      <div className="mb-4 flex justify-end">
        <div className="space-x-2">
          <button
            onClick={() => setSortOrder("asc")}
            disabled={sortOrder === "asc"}
            className={`px-3 py-1 rounded transition 
    ${sortOrder === "asc" ? "bg-[#FF0436] cursor-not-allowed" : "bg-gray-700 hover:bg-[#FF4E6B] cursor-pointer"}`}
          >
            오래된순
          </button>

          <button
            onClick={() => setSortOrder("desc")}
            disabled={sortOrder === "desc"}
            className={`px-3 py-1 rounded transition 
    ${sortOrder === "desc" ? "bg-[#FF0436] cursor-not-allowed" : "bg-gray-700 hover:bg-[#FF4E6B] cursor-pointer"}`}
          >
            최신순
          </button>
        </div>
      </div>
      <main>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error loading LPs</div>}
        <div className="relative mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {data?.map((lp) => (
            <LpCard key={lp.id} id={lp.id} title={lp.title} thumbnail={lp.thumbnail} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
