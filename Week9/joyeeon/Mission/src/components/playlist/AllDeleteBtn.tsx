import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../app/store';
import { clearCart } from "../../features/cart/cartSlice";

const AllDeleteBtn = () => {
    const dispatch = useDispatch();

    return(
        <button className="border mx-3 mb-20 rounded-md py-2 px-3 cursor-pointer hover:bg-gray-300"
            onClick={() => dispatch(clearCart())}
            >
            전체 삭제
        </button>
    )
}

export default AllDeleteBtn