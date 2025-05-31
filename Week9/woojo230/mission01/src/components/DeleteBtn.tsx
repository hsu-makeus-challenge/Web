import { useDispatch } from 'react-redux';
import { openModal } from '../store/modal/modalSlice';

const DeleteBtn = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="bg-red-500 text-white p-2 rounded-md flex justify-center items-center cursor-pointer"
      onClick={() => dispatch(openModal())}
    >
      전체삭제
    </button>
  );
};

export default DeleteBtn;
