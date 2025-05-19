import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LPCard from "../components/LPCard";
import SkeletonCard from "../components/SkeletonCard";
import FloatingButton from "../components/FloatingButton";
import AddLPModal from "../components/AddLPModal";
import Navbar from "../components/Navbar";
import { useDebounce } from "../hooks/queries/useDebounce";
import { LP } from "../types/lp";
import useInfiniteSearchLpList from "../hooks/queries/useInfiniteSearchLpList";

const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSubmitModal = async (formData: FormData) => {
    alert('LP 등록!');
    setIsModalOpen(false);
  }
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input.trim(), 500);
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSearchLpList({ search: debouncedInput });

  // Intersection Observer로 무한 스크롤 구현 (예시)
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback((node: HTMLDivElement) => {
    if (isLoading || isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

  function handleSearch(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault(); // 또는 로직 구현
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-md">
        <Navbar />
      </nav>
      <main className="pt-16">
        <div className="p-1">
          <h1 className="text-2xl font-bold text-center mb-6 text-green-500">LP 검색</h1>
          <div className="flex justify-center gap-1 mb-6">
            {/* 정렬 버튼은 검색페이지에선 비활성화 또는 숨김 처리 */}
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="태그명을 입력하세요!"
              className="flex-1 max-w-md bg-transparent border-b border-gray-600 focus:outline-none text-xl px-2 text-white"
            />
            <button
              className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              onClick={handleSearch}
            >
              검색
            </button>
          </div>
          <div className="max-w-[1200px] mx-auto p-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
              {!isLoading && data && data.pages && data.pages.length > 0 && (
                data.pages.flatMap((page, pageIndex) =>
                  (Array.isArray(page?.data?.data) ? page.data.data : []).map((lp: LP, idx: number, arr: LP[]) => {
                    // 마지막 아이템에 ref 연결
                    const isLast = pageIndex === data.pages.length - 1 && idx === arr.length - 1;
                    return (
                      <div key={lp.id} ref={isLast ? lastItemRef : undefined}>
                        <LPCard lp={lp} />
                      </div>
                    );
                  })
                )
              )}
              {(isLoading || isFetchingNextPage) &&
                Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
              }
            </div>
          </div>
          <div style={{ height: 1 }} ref={lastItemRef} />
        </div>
      </main>
      <FloatingButton onClick={handleOpenModal} />
      {isModalOpen && (
        <AddLPModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
      )}
    </div>
  );
};

export default SearchPage;