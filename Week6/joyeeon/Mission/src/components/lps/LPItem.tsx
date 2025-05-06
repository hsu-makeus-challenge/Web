import type { LP } from "../../apis/lps";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

interface LpItemProps {
    lp: LP;
}

const LpItem = ({lp} : LpItemProps) =>{
    const navigate = useNavigate();
    const handleNavigate = (id:number) => (e:MouseEvent<HTMLLIElement>) => {
                navigate(`/lp/${id}`);
            };

    return(
        <li key={lp.id} onClick={handleNavigate(lp.id)} 
        className="relative w-32 group aspect-square overflow-hidden  hover:scale-120">

            <img src={lp.thumbnail} 
            alt="lp썸네일" 
            className="w-full h-full object-cover"
            />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100
                text-sm/7 text-white flex flex-col items-center justify-center leading-tight">
            <div className="mb-1 text-center text-[11px]">{lp.content.split(".")[0].trim()+"."}</div>
            <article className="flex flex-row justify-between w-full items-center px-5">
                <span className="text-[10px]">{lp.createdAt.slice(5, 10)}</span>
                <div className="flex items-center justify-center"> <FaHeart className="text-[9px]"/> {lp.likes.length}</div>
            </article>
        </div>
        </li>
    )
}

export default LpItem;