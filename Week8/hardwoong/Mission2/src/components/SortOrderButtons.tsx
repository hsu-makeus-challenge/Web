import { PAGINATION_ORDER } from "../enums/common";

interface SortOrderButtonsProps {
  order: PAGINATION_ORDER;
  setOrder: (value: PAGINATION_ORDER) => void;
}

const SortOrderButtons = ({ order, setOrder }: SortOrderButtonsProps) => {
  return (
    <div className="space-x-2">
      <button
        onClick={() => setOrder(PAGINATION_ORDER.asc)}
        className={`px-3 py-1 rounded transition ${
          order === PAGINATION_ORDER.asc
            ? "bg-[#FF0436] cursor-not-allowed"
            : "bg-gray-700 hover:bg-[#FF4E6B] cursor-pointer"
        }`}
        disabled={order === PAGINATION_ORDER.asc}
      >
        오래된순
      </button>
      <button
        onClick={() => setOrder(PAGINATION_ORDER.desc)}
        className={`px-3 py-1 rounded transition ${
          order === PAGINATION_ORDER.desc
            ? "bg-[#FF0436] cursor-not-allowed"
            : "bg-gray-700 hover:bg-[#FF4E6B] cursor-pointer"
        }`}
        disabled={order === PAGINATION_ORDER.desc}
      >
        최신순
      </button>
    </div>
  );
};

export default SortOrderButtons;