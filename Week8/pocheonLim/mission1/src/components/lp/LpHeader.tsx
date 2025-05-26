import { MdEdit, MdDelete } from 'react-icons/md';
import { LpDetail } from '../../types/lp';

interface LpHeaderProps {
  data: LpDetail;
  isMyLp: boolean;
  isEditing: boolean;
  editTitle: string;
  setEditTitle: (value: string) => void;
  setIsEditing: (value: boolean) => void;
  onDelete: () => void;
}

export const LpHeader = ({
  data,
  isMyLp,
  isEditing,
  editTitle,
  setEditTitle,
  setIsEditing,
  onDelete,
}: LpHeaderProps) => {
  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <img src={data.author?.avatar || '/images/user.png'} alt="작성자" className="w-10 h-10 rounded-full" />
        <span className="text-base font-semibold">{data.author?.name}</span>
        <span className="ml-auto text-xs text-gray-400">{new Date(data.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="text-2xl font-bold mb-4 flex items-center gap-2">
        {isEditing ? (
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white w-full"
            autoFocus
          />
        ) : (
          <span>{data.title}</span>
        )}
      </div>
      {isMyLp && !isEditing && (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button 
            className="text-gray-400 hover:text-white bg-[#232b3b] rounded-full p-1"
            onClick={() => setIsEditing(true)}
          >
            <MdEdit size={20} />
          </button>
          <button 
            className="text-gray-400 hover:text-red-500 bg-[#232b3b] rounded-full p-1"
            onClick={onDelete}
          >
            <MdDelete size={20} />
          </button>
        </div>
      )}
    </>
  );
}; 