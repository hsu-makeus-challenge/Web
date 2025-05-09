import { ClipLoader } from "react-spinners";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[4vw] h-[4vw]">
                <ClipLoader color="#4ade80" size="100%" />
            </div>
        </div>
    );
};

export default Spinner;
