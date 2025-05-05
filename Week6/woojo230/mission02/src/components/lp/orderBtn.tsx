interface OrderBtnProps {
  order: string;
  onAscClick: () => void;
  onDescClick: () => void;
}

export const OrderButtons = ({
  order,
  onAscClick,
  onDescClick,
}: OrderBtnProps) => {
  return (
    <div className="flex justify-end w-full mb-1">
      <div className="inline-flex rounded-md overflow-hidden mr-7 border-2 border-lime-500">
        <button
          onClick={onAscClick}
          className={`px-4 py-2 text-sm font-medium cursor-pointer ${
            order === 'asc' ? 'bg-lime-500 text-white' : 'bg-white text-black'
          }`}
        >
          오래된순
        </button>
        <button
          onClick={onDescClick}
          className={`px-4 py-2 text-sm font-medium cursor-pointer ${
            order === 'desc' ? 'bg-lime-500 text-white' : 'bg-white text-black'
          }`}
        >
          최신순
        </button>
      </div>
    </div>
  );
};
