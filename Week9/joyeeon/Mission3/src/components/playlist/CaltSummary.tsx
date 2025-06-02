import { useCartStore } from "../../stores/cartStore";

const CartSummary = () =>{
    // const cart = useSelector((state: RootState) => 
    //         state.cart.items);
    const cart = useCartStore((state) => state.items);
    const totalAmount = cart.reduce((sum, item) => sum + item.amount, 0);   
    const totalPrice = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.amount), 0);   
    
    return(
        <div>
            <p>총 수량: {totalAmount}</p>
            <p>총 금액: {totalPrice.toLocaleString()}원</p>
        </div>
    )
}

export default CartSummary;