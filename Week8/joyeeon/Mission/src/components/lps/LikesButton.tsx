import { FaHeart } from "react-icons/fa";
import { useState } from "react";
//import { useAddLike, useRemoveLike } from "../../hooks/UseControlLikes";
import { useToggleLike } from "../../hooks/UseControlLikes";
interface LikesButtonProps {
    count: number;
    lpId: number;
    currentUserId: number;
    likedUserIds: number[]; // 좋아요 누른 사용자 id 목록
}

const LikesButton = ({ count, lpId, currentUserId, likedUserIds }: LikesButtonProps) => {
    const [localCount, setLocalCount] = useState(count);
    const [isLiked, setIsLiked] = useState(likedUserIds.includes(currentUserId));

    // const { mutate: addLikeMutation } = useAddLike();
    // const { mutate: removeLikeMutation } = useRemoveLike();

    const { mutate: toggleLike } = useToggleLike();
    //const isLiked = likedUserIds.includes(currentUserId);

    const handleToggleLike = () => {
        if (!currentUserId) {
            alert("로그인이 필요합니다.");
            return;
        }

        toggleLike({
            lpId,
            userId: currentUserId,
            isCurrentlyLiked: isLiked,
        });

        // if (isLiked) {
            
        //     setIsLiked(false);
        //     setLocalCount((prev) => prev - 1);
        //     removeLikeMutation(lpId);
        // } else {
            
        //     setIsLiked(true);
        //     setLocalCount((prev) => prev + 1);
        //     addLikeMutation(lpId);
        // }
        setIsLiked((prev) => !prev);
        setLocalCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };


    return (
        <button
            onClick={handleToggleLike}
            className={`w-[120px] flex items-center justify-center gap-2 px-2 py-1 rounded 
        ${isLiked ? "bg-red-100 text-red-500" : "bg-white text-gray-700"} 
        transition`}
        >
            <FaHeart />
            {localCount}
        </button>
    );
};

export default LikesButton;