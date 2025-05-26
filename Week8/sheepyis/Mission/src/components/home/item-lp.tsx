import { useNavigate } from "react-router-dom";
import type { LpItem } from "../../types/lp";
import ItemLpOverlay from "./item-lpOverlay";

type Props = {
  item: LpItem;
};

const ItemLp = ({ item }: Props) => {
  const navigate = useNavigate();

  const handleItemDetailClick = () => {
    navigate(`/lp/${item.id}`);
  };

  return (
    <div className="relative overflow-hidden rounded w-full h-[13vw] transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={handleItemDetailClick}>
      {item.thumbnail ? (
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white text-[1vw]">이미지 없음</div>
      )}

      <ItemLpOverlay item={item} />
    </div>
  );
};

export default ItemLp;
