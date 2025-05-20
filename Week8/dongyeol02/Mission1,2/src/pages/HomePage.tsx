import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGIMATION_ORDER } from "../enums/commons";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import usePostLp from "../hooks/mutation/usePostLp";
import LpCreatmodal, { NewLpForm } from "../components/\bLpCreatemodal";
import useDebounce from "../hooks/queries/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {
  const [search, setSearch] = useState("");
  //const { data, isPending, isError } = useGetLpList({ search, limit: 50 });
  const [showModal, setShowModal] = useState(false);
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const { mutate: postLpMutate } = usePostLp();
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(5, debouncedValue, PAGIMATION_ORDER.desc);
  //ref 특정 html 요소 감지 inView 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  if (isPending) {
    return <div className="mt-20">Loading....</div>;
  }
  if (isError) {
    return <div className="mt-20">Error...</div>;
  }
  console.log(lps?.pages.map((page) => page.data.data));
  const handleSubmit = (newLp: NewLpForm) => {
    postLpMutate(
      {
        title: newLp.name,
        content: newLp.content,
        thumbnail: "/lpImg.jpeg",
        tags: newLp.tags,
        published: true,
      },
      {
        onSuccess: () => {
          setShowModal(false); // 등록 성공하면 모달 닫기
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-gray-600 p-4 rounded-xm mb-2 bg-amber-400"
        placeholder="검색어를 입력하새요"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-10 mt-10 bg-transparent"></div>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600 text-2xl"
      >
        ＋
      </button>
      {showModal && (
        <LpCreatmodal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
export default HomePage;
