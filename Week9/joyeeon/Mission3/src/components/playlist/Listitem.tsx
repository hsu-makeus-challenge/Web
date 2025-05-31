
import type { CartItem } from "../../types/playlistitem";
import { useCartStore } from "../../stores/cartStore";


interface ItemProps {
    item: CartItem
}

const Listitem = ({ item }: ItemProps) => {
    //const [count, setCount] = useState(0);
    //const cart = useSelector((state: RootState) => state.cart.items.find((i) => i.id === item.id));
    //const amount = cart?.amount || 0;
    //const dispatch = useDispatch();
    const cart = useCartStore((state) => state.items);
    const amount = cart.find((i) => i.id === item.id)?.amount || 0;
    const decrement = useCartStore((state) => state.decrement);
    const increment = useCartStore((state) => state.increment);

    const decresehandler = () => {
        decrement(item.id);
    }

    return (
        Number(amount) > 0 ?
            (
                <li className="flex flex-row justify-between items-center mb-10 ">
                    <div className="flex flex-row items-center gap-2 max-w-[60%]">
                        <img src={item.img} alt={item.title} className="w-[70px] h-[70px] bg-yellow-100 rounded-md" />
                        <article className="space-y-0.1">
                            <h3 className="font-bold my-0">{item.title}</h3>
                            <p className="text-[12px]">{item.singer}</p>
                            <span className="font-bold text-[14px]">${item.price}</span>
                        </article>
                    </div>

                    <div className="flex items-center border rounded overflow-hidden w-fit h-fit cursor-pointer">
                        <button className="bg-gray-200 px-3 py-1 text-lg cursor-pointer
                    hover:bg-gray-300"
                            onClick={() => {
                                decresehandler();
                            }}
                        >-</button>
                        <div className="px-4 py-1 text-lg border-x">{amount}</div>
                        <button className="bg-gray-200 px-3 py-1 text-lg cursor-pointer
                    hover:bg-gray-300"
                            onClick={() => {
                                (increment(item.id));
                            }}
                        >+</button>
                    </div>
                </li>
            ) : null

    );
}

export default Listitem;