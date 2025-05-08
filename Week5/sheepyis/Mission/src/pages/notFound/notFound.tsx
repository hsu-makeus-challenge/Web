import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="w-full h-full flex flex-col items-center mt-[5vw] gap-[1vw]">
            <p className="text-[1.2vw] font-bold">잘못된 경로입니다.</p>
            <Link to="/">
                <button
                    className="px-[1vw] py-[0.5vw] text-[1vw] font-bold rounded-[0.4vw] bg-green-200"
                >
                    홈으로 가기
                </button>
            </Link>
        </div>
    );
};

export default NotFound;
