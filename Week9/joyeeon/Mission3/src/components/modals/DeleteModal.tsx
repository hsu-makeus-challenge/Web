import Modal from 'react-modal';
import { customModalStyles } from '../../styles/CustomModal';
Modal.setAppElement('#root');
import { useModalStore } from '../../stores/modalStore';
import { useCartStore } from '../../stores/cartStore';

const DeleteModal = () => {
    const isOpen = useModalStore((state) => state.isOpen);
    const clearCart = useCartStore((state) => state.clearCart);
    const closeModal = useModalStore((state) => state.closeModal);
    // const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    // const dispatch = useDispatch();

    const handleconfirm = () => {
        clearCart();
        closeModal();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => closeModal()}
            contentLabel='delete modal'
            style={customModalStyles}
        >
            <main className='flex flex-col justify-center items-center w-full h-full'>
                <div className="mb-4 text-lg">정말 삭제하시겠습니까?</div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => closeModal()}
                        className="px-3 py-1 border rounded hover:bg-gray-200"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleconfirm}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        삭제
                    </button>
                </div>
            </main>
        </Modal >
    )
}

export default DeleteModal;