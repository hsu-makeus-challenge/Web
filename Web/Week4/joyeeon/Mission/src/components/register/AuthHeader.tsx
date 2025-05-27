import Google from "./Google";
import { SlArrowLeft } from "react-icons/sl";

interface AuthProps {
    path: string;
    step?: number;
}

const AuthHeader = ({ path, step }: AuthProps) => {

    return (
        <header className="w-full">
            <button className="flex items-center justify-start w-full h-10 gap-15 font-bold">
                <SlArrowLeft className="cursor-pointer" style={{ fontWeight: 700 }} onClick={() => window.history.back()} />
                {path}
            </button>


            {step === 1 && (
                <>
                    <Google />
                    <div className="flex items-center w-full h-15">
                        <div className="customHr w-full"></div>
                        <span className="m-10">OR</span>
                        <div className="customHr w-full"></div>
                    </div>
                </>
            )}
        </header>
    )
}

export default AuthHeader