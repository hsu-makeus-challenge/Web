import Modal from 'react-modal';
import { customModalStyles } from '../../styles/CustomModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
Modal.setAppElement('#root');
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import { closeModal } from '../../features/modal/modalSlice';

const DeleteModal = () => {
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const dispatch = useDispatch();

    const handleconfirm = () => {
        dispatch(clearCart());
        dispatch(closeModal());
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => dispatch(closeModal())}
            contentLabel='delete modal'
        >
            <main className='flex flex-col justify-center items-center w-full h-full'>
                <div className="mb-4 text-lg">정말 삭제하시겠습니까?</div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => dispatch(closeModal())}
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