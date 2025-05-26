type SortButtonProps = {
    order: "asc" | "desc";
    setOrder: (value: "asc" | "desc") => void;
};

const SortButton = ({ order, setOrder }: SortButtonProps) => {
    return (
        <div className="flex justify-end mb-[2vw] gap-[1vw] text-[1vw]">
            <button 
                onClick={() => setOrder("asc")}
                className={`px-[1vw] py-[0.5vw] rounded cursor-pointer ${
                order === "asc" ? "bg-white text-black" : "bg-gray-700 text-white"
                }`}
            >
                오래된 순
            </button>
            <button
                onClick={() => setOrder("desc")}
                className={`px-[1vw] py-[0.5vw] rounded cursor-pointer ${
                order === "desc" ? "bg-white text-black" : "bg-gray-700 text-white"
                }`}
            >
                최신순
            </button>
        </div>
    )
}

export default SortButton;