import DeleteModal from "../modals/DeleteModal";
import { useModalStore } from "../../stores/modalStore";

const AllDeleteBtn = () => {
    //const [modalIsOpen, setIsOpen] = React.useState(false);
    //const dispatch = useDispatch();

    const openModal = useModalStore((state) => state.openModal);

    const handleopenModal = () => {
        openModal();
    }
    return (
        <>
            <button className="border mx-3 mb-20 rounded-md py-2 px-3 cursor-pointer hover:bg-gray-300"
                onClick={handleopenModal}
            >
                전체 삭제
            </button>

            <DeleteModal />
        </>

    )
}

export default AllDeleteBtn