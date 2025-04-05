import { MdError } from "react-icons/md";

const isError = () =>{
    return (
        <section className="flex flex-col items-center">
        <MdError   className="text-red-500 text-4xl"/>
        <div>에러가 발생했습니다.</div>
        </section>
    )
}

export default isError;