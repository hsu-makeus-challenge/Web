import type { LpItem } from "../../types/lp";
import ItemLp from "./item-lp";

type Props = {
  data?: LpItem[];
};

const ListLp = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return <p className="text-white text-[1vw]">데이터가 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-5 gap-1">
      {data.map((item) => (
        <ItemLp 
            key={item.id}
            item={item}
        />
      ))}
    </div>
  );
};

export default ListLp;
