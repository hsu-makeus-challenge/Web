import ListCart from "../../components/list/list-cart";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { openModal } from "../../slices/modalSlice";
import Modal from "../../components/modal/modal";

const List = () => {
    const dispatch = useDispatch();
    const { totalAmount } = useSelector((state: RootState) => state.cart);
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    
    return (
        <>
            <ListCart />

            <div className="w-full h-[5vw] items-center flex justify-between p-[1vw] my-[2vw] border-black border-t-[0.2vw]">
                <button className="px-[1vw] py-[0.5vw] bg-blue-950 text-white text-xs cursor-pointer" onClick={() => dispatch(openModal())}>전체 삭제</button>
                <p className="text-xs">금액: {totalAmount}</p>
            </div>

            {isOpen && <Modal />}
        </>
    )
}

export default List;