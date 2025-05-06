import type { LpComment } from "../../hooks/UseLpCommentFetch";
import { SlOptionsVertical } from "react-icons/sl";

interface CommentItemProps {
    comment: LpComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
    return (
        <li className="flex flex-row w-full h-full items-center justify-between">
            <div className="flex flex-col">

                <div className="text-[12px] text-gray-800 font-semibold mb-1">
                    {comment.author?.name ?? "익명"}
                </div>
                <div className="text-gray-600 text-xs mb-2">
                {comment.content}
                </div>
            </div>

            
            <SlOptionsVertical className="text-[15px]" />

        </li>
    );
};

export default CommentItem;