interface PaginationProps {
  page: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({ page, onPrev, onNext }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-20 mb-8">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className={`px-4 py-2 rounded ${
          page === 1
            ? 'bg-gray-300 cursor-not-allowed' // 페이지가 1일 때 이전 버튼 회색, 비활성화
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        이전
      </button>

      <span className="text-lg font-semibold">페이지 {page}</span>

      <button
        onClick={onNext}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;