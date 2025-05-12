import useGetLPList from "../hooks/queries/useGetLPList";
import React, { useState } from "react";
import LPCard from "../components/LPCard";
import LPListPage from "./LPListPage";

const HomePage = (): JSX.Element => {
  // const [search, setSearch] = useState("");
  const { data, isPending, isError } = useGetLPList({});

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div className="w-full h-full p-10">
      <LPListPage />
    </div>
  );
};

export default HomePage;






{/*import {useQuery} from "@tanstack/react-query";
import {QUERY_KEY} from "../constants/key";
import {getLPList} from "../api/lp";
import { data } from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PaginationDto } from "../types/common";
import React, { useState } from "react";

const HomePage = (): JSX.Element => {
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const paginationDto: PaginationDto = {
    order,
    limit: 20,
    cursor: 0,
  };

  const { data: lpListData, isPending, isError } = useQuery({
    queryKey: [QUERY_KEY.LP_LIST, paginationDto],
    queryFn: () => getLPList(paginationDto),
  });

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div className="pl-56 pt-20 min-h-screen bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4 gap-2">
          <button
            className={`px-4 py-2 rounded-full font-bold shadow-md transition ${
              order === 'desc' ? 'bg-green-400 text-green-900' : 'bg-white text-green-500 border-2 border-green-400'
            }`}
            onClick={() => setOrder("desc")}
          >
            오래된순
          </button>
          <button
            className={`px-4 py-2 rounded-full font-bold shadow-md transition ${
              order === 'asc' ? 'bg-green-400 text-green-900' : 'bg-white text-green-500 border-2 border-green-400'
            }`}
            onClick={() => setOrder("asc")}
          >
            최신순
          </button>
        </div>
        <div className="grid grid-cols-5 gap-6">
        {lpListData?.data?.data?.map((lp: any) => (
            <div
              key={lp.id}
              className="relative w-full"
              style={{ paddingBottom: "100%" }}
            >
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );*/}