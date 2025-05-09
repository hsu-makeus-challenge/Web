import { useState } from "react";
import ListLp from "../../components/home/list-lp";
import { useLpQuery } from "../../hooks/lp/useLpQuery";

const Home = () => {
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const { data } = useLpQuery(order, 0, 10);
    console.log(data);

    return (
        <div className="w-full h-full flex flex-col items-center py-[2vw]">
            <div className="w-[90%]">
                <div className="flex justify-end mb-[2vw] gap-[1vw] text-[1vw]">
                    <button onClick={() => setOrder("asc")}
                        className={`px-[1vw] py-[0.5vw] rounded cursor-pointer ${order === "asc" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
                    >
                        오래된 순
                    </button>
                    <button onClick={() => setOrder("desc")}
                        className={`px-[1vw] py-[0.5vw] rounded cursor-pointer ${order === "desc" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
                    >
                        최신순
                    </button>
                </div>

                {data && <ListLp data={data.data} />}
            </div>
        </div>
    );
};

export default Home;
