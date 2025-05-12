import type { LpItem } from "../../types/lp";

type Props = {
  item: LpItem;
};

const ItemLpOverlay = ({ item }: Props) => {
    const formattedDate = item.createdAt.slice(0, 10);
    return (
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-60 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-white font-semibold text-[1vw] line-clamp-2">
            {item.title}
        </p>
        <div className="flex justify-between items-end">
            <p className="text-white text-[1vw]">{formattedDate}</p>
            <div className="text-white text-[1vw] mt-1">❤️ {item.likes.length}</div>
        </div>
        </div>
    );
};

export default ItemLpOverlay;
