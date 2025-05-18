import { useParams } from "react-router-dom";
import { useLpDetail } from "../../hooks/lp/useLpDetailQuery";
import Detail from "../../components/lp/detail/detail";

const LpDetail = () => {
    const { id } = useParams();
    const { data } = useLpDetail(id);
    // console.log(data);

    return (
        <div className="w-full h-full flex flex-col items-center py-[2vw]">
            <div className="w-[80%] flex flex-col">
                {data && <Detail data={data} />}
            </div>
        </div>
    )
}

export default LpDetail;