import { formatDate } from '../../components/lpDetail/dateUtils';
import { DeleteIcon, EditIcon } from '../../components/lpDetail/icons';
import useLpEditStore from '../../stores/lpEdit';
interface LpRecordProps {
  thumbnail?: string;
  title?: string;
}

interface AuthorProps {
  avatar?: string | null;
  name?: string;
  createdAt?: string;
}

interface TitleProps {
  title?: string;
  handleDelete?: () => void;
}

interface TagProps {
  tags?: Array<{ id: number; name: string }>;
}

export const LpRecord = ({ thumbnail, title }: LpRecordProps) => (
  <div className="relative w-full aspect-square bg-lime-900 rounded-lg overflow-hidden mb-4">
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="relative w-3/4 h-3/4 rounded-full animate-spin"
        style={{ animationDuration: '10s' }}
      >
        {/* lp img */}
        <img
          src={thumbnail}
          alt={title || ''}
          className="absolute inset-0 w-full h-full rounded-full object-cover"
        />

        {/* cd hole */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full z-10"></div>
      </div>
    </div>
  </div>
);

export const LpHeader = ({ avatar, name, createdAt }: AuthorProps) => (
  <div className="flex items-center justify-between mb-4 text-white">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-lime-500 flex items-center justify-center text-xs">
        <img
          src={avatar || 'https://via.placeholder.com/150'}
          alt={name || ''}
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
      <span>{name}</span>
    </div>
    <div className="text-sm text-white">{formatDate(createdAt)}</div>
  </div>
);

export const LpTitle = ({ title, handleDelete }: TitleProps) => {
  const { toggleLpEdit } = useLpEditStore();
  return (
    <div className="flex justify-between items-center mb-4 text-white">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex gap-2">
        <button className="text-lime-500 cursor-pointer" onClick={toggleLpEdit}>
          <EditIcon />
        </button>
        <button className="text-lime-500 cursor-pointer" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export const LpTags = ({ tags }: TagProps) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {tags && tags.length > 0 ? (
      tags.map((tag) => (
        <span
          key={tag.id}
          className="px-2 py-1 bg-gray-800 text-lime-500 rounded-full text-xs"
        >
          #{tag.name}
        </span>
      ))
    ) : (
      <span className="px-2 py-1 bg-gray-800 text-lime-500 rounded-full text-xs">
        태그 없음
      </span>
    )}
  </div>
);
