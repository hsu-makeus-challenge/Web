import type { JSX } from 'react';
import { useModalStore } from '../hooks/useModalStore';

const DeleteButton = (): JSX.Element => {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <button
      className="items-center border p-4 rounded-md cursor-pointer mb-4 bg-red-500 text-white hover:bg-red-600 transition"
      onClick={openModal}
    >
      전체 삭제
    </button>
  );
};

export default DeleteButton;