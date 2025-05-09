import type { LpDetail } from "../../types/lpdetails";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import LpCommentList from "./LPCommentList";
import "../../styles/LPDetailComp.css";

interface DetailItemProps {
    detail: LpDetail;
}

const LpDetailComp = ({ detail }: DetailItemProps) => {

    return (
        <main className="bg-emerald-100 w-[90%] my-20 mx-20 min-h-[90%] px-5 py-5 rounded-md">
            <header className="flex justify-between">
                <div className="flex gap-5">
                    <img className="w-[30px] rounded-2xl" src={detail.author?.avatar} alt="프로필" />
                    {detail.author?.name || "이름"}
                </div>
                <span>{detail.createdAt.slice(5, 10)}</span>
            </header>
            <article className="flex w-full justify-center my-5">
                <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden shadow-2xl justify-center">

                    <img
                        src={detail.thumbnail}
                        alt="콘텐츠썸네일"
                        className="object-cover w-full h-full rounded-full spin-slow"
                        style={{ animation: 'spin 8s linear infinite' }}
                    />

                    <div className="absolute top-1/2 left-1/2 w-[60px] h-[60px] bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
                </div>
            </article>

            <article>
                <div className="mt-5 font-bold">
                    {detail.title}
                </div>
                <div className=" my-10">
                    {detail.content}
                </div>
            </article>

            <footer className=" flex text-[10px] items-center gap-4 mt-6">
                <button className="flex items-center gap-2 px-2 py-1 bg-blue-200 rounded-lg hover:bg-blue-100 transition">
                    <FaEdit />
                    수정
                </button>
                <button className="flex items-center gap-2 px-2 py-1 bg-red-200 rounded-lg hover:bg-red-100 transition">
                    <MdDelete />
                    삭제
                </button>
                
            </footer>
            {/* <div>
                {detail.content}
            </div> */}
            <LpCommentList lpId={detail.id} />
        </main>
    )
}

export default LpDetailComp;