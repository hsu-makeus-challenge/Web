import useModalStore from '../store/modal/modalCart';

const DeleteBtn = () => {
  const toggleModal = useModalStore((state) => state.toggleModal);

  return (
    <button
      className="bg-red-500 text-white p-2 rounded-md flex justify-center items-center cursor-pointer"
      onClick={() => toggleModal()}
    >
      전체삭제
    </button>
  );
};

export default DeleteBtn;
