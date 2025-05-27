import type { LpComment } from "../../hooks/UseLpCommentFetch";
import { SlOptionsVertical } from "react-icons/sl";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useUpdateLpComment , useDeleteLpComment} from "../../hooks/UseControlLpComment";
import { FaCheck } from "react-icons/fa";


interface CommentItemProps {
    comment: LpComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
    const userid = Number( localStorage.getItem("ID"));
    const [showMenu, setShowMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [isDelete, setIsDelete] = useState(false);
    
    const {mutate : updatecomment } = useUpdateLpComment();
    const {mutate : deletecomment} = useDeleteLpComment();

    const handleMenuToggle = () => {
        setShowMenu((prev) => !prev);
    };

    const handleEdit = () => {
        setIsEdit(true);
        setShowMenu(false);
    }

    const handleDelete = () =>{
        deletecomment
        ({
            lpid: comment.lpId,
            commentid: comment.id,
        });
    }

    const handleUpdateSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        updatecomment({
            content: editContent,
            lpid: comment.lpId,
            commentid: comment.id,
        });
        setIsEdit(false);
    }

    return (
        <li className="flex flex-row w-full h-full items-center justify-between">
            <div className="flex flex-col">

                <div className="text-[12px] text-gray-800 font-semibold mb-1">
                    {comment.author?.name ?? "익명"}
                </div>
                {isEdit ? (
                    <form onSubmit={handleUpdateSubmit} className="flex flex-row gap-2">
                        <input
                            type="text"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                        />
                        <button type="submit" className="text-gray-800 hover:text-gray-300 cursor-pointer"><FaCheck /></button>
                    </form>
                ) : (
                    <div className="text-gray-600 text-xs mb-2">
                        {comment.content}
                    </div>
                )}
                
            </div>

            {userid === comment.authorId && (
                <div className="relative flex flex-col gap-2 w-fit">
                    <button onClick={handleMenuToggle}>
                        <SlOptionsVertical className="text-[15px] cursor-pointer" />
                    </button>
                {showMenu && (
                    <div className="absolute flex flex-row gap-3 top-full mt-1 bg-white shadow-lg rounded-md p-2 z-20">
                        <button className="hover:text-gray-400 cursor-pointer"
                            onClick={handleEdit}>
                            <FaEdit />
                        </button>
                        <button className="hover:text-gray-400 cursor-pointer"
                            onClick={handleDelete}>
                        
                            <MdDelete />
                        </button>
                    </div>
                    )}
                </div>
            )}

        </li>
    );
};

export default CommentItem;