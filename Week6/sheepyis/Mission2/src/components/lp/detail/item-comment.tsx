import type { CommentItem } from "../../../types/comment";

type Props = {
  comment: CommentItem;
};

const ItemComment = ({ comment }: Props) => {
  return (
    <div className="flex gap-[1vw] items-start bg-gray-800 p-[1vw] rounded">
      {comment.author.avatar ? (
          <img src={comment.author.avatar} alt="author" className="rounded-full w-[4vw] h-[4vw]"/>
        ) : (
          <div className="rounded-full w-[4vw] h-[4vw] bg-gray-500" />
        )}
        <div className="flex flex-col">
            <p className="text-white text-[1.2vw]">{comment.author.name}</p>
            <p className="text-gray-400 text-[1vw]">{comment.content}</p>
        </div>
    </div>
  );
};

export default ItemComment;
