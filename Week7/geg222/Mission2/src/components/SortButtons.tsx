import React from "react";

type SortButtonsProps = {
  order: "asc" | "desc";
  setOrder: (value: "asc" | "desc") => void;
};

const SortButtons = ({ order, setOrder }: SortButtonsProps) => {
  return (
    <div className="flex justify-end mb-4 gap-2">
      <button
        onClick={() => setOrder("desc")}
        className={`px-4 py-2 rounded ${
          order === "desc" ? "bg-white text-black" : "bg-gray-700 text-white"
        }`}
      >
        최신 순
      </button>
      <button
        onClick={() => setOrder("asc")}
        className={`px-4 py-2 rounded ${
          order === "asc" ? "bg-white text-black" : "bg-gray-700 text-white"
        }`}
      >
        오래된 순
      </button>
    </div>
  );
};

export default SortButtons;
