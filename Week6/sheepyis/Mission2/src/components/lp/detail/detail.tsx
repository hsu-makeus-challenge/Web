import { useState } from "react";
import type { LpDetailItem } from "../../../types/lp";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ListTag from "./list-tag";
import Comment from "./comment";

type Props = {
  data: LpDetailItem;
};

const Detail = ({ data }: Props) => {
    const formattedDate = data.createdAt.slice(0, 10);

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(data.likes.length);
    
    const handleLikeToggle = () => {
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    return (
        <div className="flex flex-col gap-[1vw]">
            <div className="w-full h-full rounded bg-gray-700 flex justify-center py-[1vw]">
                <div className="w-[80%] flex gap-[2vw] flex-col items-center">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex gap-[1vw] items-center">
                            <img src={data.author.avatar ?? ""} alt={data.author.name} className="w-[2vw] h-[2vw] rounded-full object-cover" />
                            <p className="text-[1vw]">{data.author.name}</p>
                        </div>
                        <p className="text-[1vw]">{formattedDate}</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p className="w-[80%] text-[1vw]">{data.title}</p>
                        <div className="flex gap-[1vw]">
                            <button>
                                <FiEdit2 className="text-[1.2vw] text-white hover:text-pink-400 cursor-pointer" />
                            </button>
                            <button>
                                <FiTrash2 className="text-[1.2vw] text-white hover:text-red-400 cursor-pointer" />
                            </button>
                        </div>
                    </div>

                    <div className="relative w-[30vw] h-[30vw] shadow-lg shadow-black flex justify-center items-center">
                        <img src={data.thumbnail} alt={data.title} className="w-[25vw] h-[25vw] rounded-full border-black border-[0.5vw]"/>
                        <div className="bg-white w-[6vw] h-[6vw] absolute rounded-full border-[0.3vw] border-gray-700" />
                    </div>

                    <div className="w-full">
                        <p className="text-[1vw]">{data.content}</p>
                    </div>

                    <div className="w-full">
                        <ListTag data={data.tags}/>
                    </div>

                    <div className="w-full flex justify-center items-center gap-[0.5vw]">
                        <button onClick={handleLikeToggle}>
                            {isLiked ? (
                                <AiFillHeart className="text-[1.5vw] text-pink-500" />
                            ) : (
                                <AiOutlineHeart className="text-[1.5vw] text-white hover:text-pink-400" />
                            )}
                        </button>
                        <p className="text-white text-[1vw]">{likeCount}</p>
                    </div>
                </div>
            </div>
            
            <Comment />
        </div>
    );
};

export default Detail;
