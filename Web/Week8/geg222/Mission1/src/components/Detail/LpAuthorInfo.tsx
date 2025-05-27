import { formatDistanceToNow } from "date-fns";

interface LpAuthorInfoProps {
  author: {
    nickname?: string;
    name?: string;
    avatar?: string;
  };
  createdAt: string;
}

const LpAuthorInfo = ({ author, createdAt }: LpAuthorInfoProps) => {
  const displayName = author?.nickname ?? author?.name ?? "?";
  const initial = displayName[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {author?.avatar ? (
          <img
            src={author.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
            {initial}
          </div>
        )}
        <span className="font-semibold hover:underline hover:text-green-300 transition duration-150">
          {displayName}
        </span>
      </div>
      <p className="text-[11px] text-gray-400 bg-[#282828] px-2 py-0.5 rounded-sm tracking-wide">
        {createdAt
          ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
          : ""}
      </p>
    </div>
  );
};

export default LpAuthorInfo;
