import type { CommentItem } from "../../../types/comment";

type Props = {
  comment: CommentItem;
};

const ItemComment = ({ comment }: Props) => {
  return (
    <div className="flex gap-[1vw] items-start bg-gray-800 p-[1vw] rounded">
        <img src={comment.author.avatar || ""} alt={comment.author.name} className="rounded-full w-[4vw] h-[4vw]"/>
        <div className="flex flex-col">
            <p className="text-white text-[1.2vw]">{comment.author.name}</p>
            <p className="text-gray-400 text-[1vw]">{comment.content}</p>
        </div>
    </div>
  );
};

export default ItemComment;
