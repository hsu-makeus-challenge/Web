type AddProps = {
    onClick: () => void;
};

const Add = ({ onClick }: AddProps) => {
    return (
        <div className="bg-pink-500 w-[5vw] h-[5vw] rounded-full absolute bottom-[2vw] right-[2vw] flex justify-center items-center cursor-pointer" onClick={onClick}>
            <p className="text-[4vw]">+</p>
        </div>
    );
};

export default Add;
