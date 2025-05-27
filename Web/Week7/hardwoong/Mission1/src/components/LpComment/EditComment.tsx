import EditButton from "../EditButton";

interface EditCommentProps {
  onClick: () => void;
}

const EditComment = ({ onClick }: EditCommentProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-sm text-gray-200 hover:text-white px-4 py-2 w-full text-left hover:bg-[#3e3e3e]"
    >
      <EditButton />
      <span className="ml-3">수정</span>
    </button>
  );
};

export default EditComment;