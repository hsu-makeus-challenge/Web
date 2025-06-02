import { useDispatch } from 'react-redux';
import { increase, decrease } from '../../slices/cartSlice';
import type { CartItem } from '../../types/cart';

interface ItemProps {
  item: CartItem;
}

const ItemCart = ({ item }: ItemProps) => {
    // console.log(item);
    const dispatch = useDispatch();

    return (
        <div className="w-full h-full border-t-[0.2vw] border-black flex items-center justify-center py-[1vw]">
            <div className="w-[70%] flex gap-[1vw]">
                <img className="w-[8vw] h-[8vw]" src={item.img} alt={item.title} />
                <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="font-bold text-xs">{item.title}</p>
                        <p className="text-xs">{item.singer}</p>
                        <p className="font-bold text-xs">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center text-white ">
                        <button onClick={() => dispatch(decrease(item.id))} className="px-[1vw] py-[0.5vw] bg-blue-950 rounded-l text-sm cursor-pointer">-</button>
                        <div className="px-[1.5vw] py-[0.5vw] border border-gray-300 text-sm bg-white text-black">
                            {item.amount}
                        </div>
                        <button onClick={() => dispatch(increase(item.id))} className="px-[1vw] py-[0.5vw] bg-blue-950 rounded-r text-sm cursor-pointer">+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCart;