type ItemTagProps = {
    tag: string;
    onRemove: (tag: string) => void;
};

const ItemTag = ({ tag, onRemove }: ItemTagProps) => {
    return (
        <div className="flex items-center gap-[0.5vw] px-[1vw] py-[0.5vw] bg-gray-700 rounded-full text-[1vw] border-white border-[0.1vw]">
            <span>{tag}</span>
            <button onClick={() => onRemove(tag)} className="text-white hover:text-red-400 cursor-pointer">✕</button>
        </div>
    );
};

export default ItemTag;
