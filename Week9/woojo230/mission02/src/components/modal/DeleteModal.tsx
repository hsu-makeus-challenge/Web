import useCartStore from '../../store/cart/cartStore';
import useModalStore from '../../store/modal/modalCart';

const DeleteModal = () => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const deleteAll = useCartStore((state) => state.action.deleteAll);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="text-center mb-4 font-bold">진짜 삭제할거임?</div>
        <div className="flex justify-between">
          <button
            onClick={() => setModalOpen(false)}
            className="bg-gray-300 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={() => {
              deleteAll();
              setModalOpen(false);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
