import type { LpDetailDataType } from "../../types/lp";
import TagItem from "./credit";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineHeart,
} from "react-icons/ai";

interface Props {
  lp: LpDetailDataType;
}

const LPDetailContent = ({ lp }: Props) => {
  const tags = lp.tags ?? [];
  const likes = lp.likes ?? [];
  const timeAgo = formatDistanceToNow(new Date(lp.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="p-6 bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {lp.author.avatar ? (
              <img
                src={lp.author.avatar}
                alt={lp.author.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-600" />
            )}
            <span className="font-medium">{lp.author.name}</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            <span className="text-sm">{timeAgo}</span>
            <AiOutlineEdit className="cursor-pointer" />
            <AiOutlineDelete className="cursor-pointer" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">{lp.title}</h1>

        <div className="relative w-72 h-72 bg-gray-700 rounded-full overflow-hidden mx-auto mb-6">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-full object-cover transform rotate-90 animate-spin-slow"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-white" />
          </div>
        </div>

        <p className="text-gray-300 mb-6 whitespace-pre-line">{lp.content}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <TagItem key={tag.id} tag={tag} />
          ))}
        </div>

        <div className="flex items-center justify-center text-gray-400">
          <AiOutlineHeart className="text-2xl mr-2" />
          <span>{likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LPDetailContent;
