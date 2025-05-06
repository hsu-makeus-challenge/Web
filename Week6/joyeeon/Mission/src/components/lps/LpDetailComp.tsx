import type { LpDetail } from "../../types/lpdetails";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface DetailItemProps {
    detail: LpDetail;
}

const LpDetailComp = ({ detail }: DetailItemProps) =>{
    return(
        <main className="bg-emerald-100 w-[90%] h-[90%] px-5 py-5 rounded-md">
            <header className="flex justify-between">
                <div className="flex gap-5">
                    <img className="w-[30px] rounded-2xl" src={detail.author?.avatar} alt="프로필" />
                    {detail.author?.name  || "이름"}
                </div>
                <span>{detail.createdAt.slice(5, 10)}</span>
            </header>
            <article>
                <img src={detail.thumbnail} alt="콘텐츠썸네일" />
            </article>
            
            <article>
                <div>
                    {detail.title}
                </div>
            </article>

            <footer className=" flex text-[20px]">
                <FaEdit/>
                <MdDelete />
            </footer>
            {/* <div>
                {detail.content}
            </div> */}
        </main>
    )
}

export default LpDetailComp;