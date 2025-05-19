interface SortOrderButtonsProps {
  order: "asc" | "desc";
  setOrder: (value: "asc" | "desc") => void;
}

const SortOrderButtons = ({ order, setOrder }: SortOrderButtonsProps) => {
  return (
    <div className="space-x-2">
      <button
        onClick={() => setOrder("asc")}
        className={`px-3 py-1 rounded transition ${
          order === "asc"
            ? "bg-[#FF0436] cursor-not-allowed"
            : "bg-gray-700 hover:bg-[#FF4E6B] cursor-pointer"
        }`}
        disabled={order === "asc"}
      >
        오래된순
      </button>
      <button
        onClick={() => setOrder("desc")}
        className={`px-3 py-1 rounded transition ${
          order === "desc"
            ? "bg-[#FF0436] cursor-not-allowed"
            : "bg-gray-700 hover:bg-[#FF4E6B] cursor-pointer"
        }`}
        disabled={order === "desc"}
      >
        최신순
      </button>
    </div>
  );
};

export default SortOrderButtons;