import { Credit } from "../../../types/credit";
import ItemCredit from "./item-credit";

interface ListProps {
  data: Credit;
}


const ListCredit = ({ data }: ListProps) => {
    const castData = data.cast;
    return (
        <div className="w-[90%] text-white my-[2vw]">
            <p className="text-[2vw] mb-[2vw]">감독/출연</p>

            <div className="w-full grid grid-cols-10 gap-[1.5vw]">
                {castData.map((person) => (
                    <ItemCredit
                        key={person.id}
                        data={person}
                    />
                ))}
            </div>
        </div>
    )
}

export default ListCredit;