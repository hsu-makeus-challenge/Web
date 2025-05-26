import ItemCart from "./item-cart";
import { useCartStore } from "../../store/useCartStore";
import { useEffect } from "react";

const ListCart = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const calculateTotals = useCartStore((state) => state.calculateTotals);

    useEffect(() => {
        calculateTotals();
    }, [cartItems, calculateTotals]);

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
        </div>
    )
}

export default ListCart;