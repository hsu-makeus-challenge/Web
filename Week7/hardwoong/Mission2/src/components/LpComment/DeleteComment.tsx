import DeleteButton from "../DeleteButton";

interface DeleteCommentProps {
  onClick: () => void;
}

const DeleteComment = ({ onClick }: DeleteCommentProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-sm text-gray-200 hover:text-white px-4 py-2 w-full text-left hover:bg-[#3e3e3e]"
    >
      <DeleteButton />
      <span className="ml-3">삭제</span>
    </button>
  );
};

export default DeleteComment;
