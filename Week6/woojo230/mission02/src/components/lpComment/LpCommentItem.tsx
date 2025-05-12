import type { LpCommentType } from '../../type/type';

interface Props {
  comment: LpCommentType;
}

const LpCommentItem = ({ comment }: Props) => {
  const { author, content } = comment;

  return (
    <div className="flex items-start gap-4 p-4 border-b border-lime-500">
      <img
        src={author.avatar ?? ''}
        alt={`${author.name} image`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-sm text-emerald-400">
            {author.name}
          </span>
        </div>
        <p className="text-sm text-white whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};

export default LpCommentItem;
