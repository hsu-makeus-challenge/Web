import ListCart from "../../components/list/list-cart";
import Modal from "../../components/modal/modal";
import { useCartStore } from "../../store/useCartStore";
import { useModalStore } from "../../store/useModalStore";

const List = () => {
    const totalAmount = useCartStore((state) => state.totalAmount);
    const openModal = useModalStore((state) => state.openModal);
    const isOpen = useModalStore((state) => state.isOpen);
    
    return (
        <>
            <ListCart />

            <div className="w-full h-[5vw] items-center flex justify-between p-[1vw] my-[2vw] border-black border-t-[0.2vw]">
                <button className="px-[1vw] py-[0.5vw] bg-blue-950 text-white text-xs cursor-pointer" onClick={openModal}>전체 삭제</button>
                <p className="text-xs">금액: {totalAmount}</p>
            </div>

            {isOpen && <Modal />}
        </>
    )
}

export default List;