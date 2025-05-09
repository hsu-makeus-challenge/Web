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
    if (inView) {
      isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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

//   return (
//     <div className="grid grid-cols-5 gap-4">
//       {lps?.pages
//         ?.map((page) => page.data.data)
//         ?.flat()
//         ?.map((lp) => (
//           <div key={lp.id} className="relative">
//             <img
//               src={lp.thumbnail}
//               alt={lp.title}
//               className="w-full h-auto rounded"
//             />
//             <div className="absolute inset-0 bg-black/30 backdrop-blur-sm text-white opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
//               <h3 className="font-bold text-base leading-tight">{lp.title}</h3>
//             </div>
//           </div>
//         ))}
//       <div
//         ref={ref}
//         className="h-20 mt-8"
//       >
//         {isFetchingNextPage && <p className="text-white text-center">Loading more...</p>}
//       </div>
//     </div>
//   );
// };

export default HomePage;
