import ItemCart from "./item-cart";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { calculateTotals } from "../../slices/cartSlice";
import { useEffect } from "react";

const ListCart = () => {
    const dispatch = useDispatch();
    const { cartItems, totalAmount } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        dispatch(calculateTotals());
    }, [cartItems, dispatch]);

    if (cartItems.length === 0) {
        return (
            <div className="text-center my-[10vw]">
                <p className="text-black text-[2vw]">장바구니에 담긴 항목이 없습니다.</p>
            </div>
        );
  }
  
    return (
        <div className="flex flex-col">
            {cartItems.map((item) => (
                <ItemCart key={item.id} item={item} />
            ))}

            <div className="w-full h-[5vw] items-center flex justify-between p-[1vw] my-[2vw] border-black border-t-[0.2vw]">
                <button className="px-[1vw] py-[0.5vw] bg-blue-950 text-white text-xs cursor-pointer">전체 삭제</button>
                <p className="">금액: {totalAmount}</p>
            </div>
        </div>
    )
}

export default ListCart;