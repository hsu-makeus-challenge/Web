import ItemComment from "./item-comment";
import type { CommentItem } from "../../../types/comment";

type Props = {
  data: CommentItem[];
};

const ListComment = ({ data }: Props) => {
  if (data.length === 0) {
    return <p className="text-white text-[1vw]">아직 댓글이 없습니다.</p>;
  }

  return (
    <div className="w-full flex flex-col gap-[1vw] mt-[1vw]">
      {data.map((comment) => (
        <ItemComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default ListComment;
