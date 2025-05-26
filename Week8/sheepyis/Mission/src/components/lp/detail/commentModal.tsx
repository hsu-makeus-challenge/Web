import { FiEdit2, FiTrash2 } from "react-icons/fi";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const CommentModal = ({ onEdit, onDelete }: Props) => {
  return (
    <div className="absolute bg-gray-800 rounded border border-white p-[0.5vw] right-0 top-[2vw] z-50 flex flex-col gap-[0.5vw] w-[6vw]">
      <button onClick={onEdit} className="flex items-center gap-[0.5vw] text-white hover:text-blue-400 text-[0.9vw]">
        <FiEdit2 /> 수정
      </button>
      <button onClick={onDelete} className="flex items-center gap-[0.5vw] text-white hover:text-red-400 text-[0.9vw]">
        <FiTrash2 /> 삭제
      </button>
    </div>
  );
};

export default CommentModal;
