import { BsCaretRightSquareFill } from "react-icons/bs";
import { BsCaretLeftSquareFill } from "react-icons/bs";

interface SlidebarProps {
    page:number;
    setPage:(page:number) =>void;
    totalPages:number;
}

const Slidebar = ({page, setPage, totalPages} : SlidebarProps) => {
    const handleprev = () =>{
        if(page > 1 ) setPage(page-1);
        console.log("prev 버튼 클릭");
    };

    const handlenext = () => {
        if(page < totalPages) setPage(page+1); 
        console.log("next 버튼 클릭");
    }

    return(
        <article className="h-12 flex items-center justify-center mb-5 mt-5">
            <button onClick={handleprev} disabled={page===1}
            className={`text-5xl transition-colors duration-200 ${
                page === 1 ? 'text-gray-400' : 'text-emerald-200'
            }`}
            >
                <BsCaretLeftSquareFill className="text-5xl"/></button>
            <span className="pr-10 pl-10 ">{page} 페이지</span>
            <button onClick={handlenext} disabled={page===totalPages}
            className={`text-5xl transition-colors duration-200 ${
                page === totalPages ? 'text-gray-400' : 'text-fuchsia-200'
            }`}
            >
                <BsCaretRightSquareFill className="text-5xl"/></button>
        </article>
    )
}

export default Slidebar;