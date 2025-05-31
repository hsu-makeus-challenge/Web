import cartItems from "../../constants/cartItems";
import Listitem from "./Listitem";
import type { CartItem } from "../../types/playlistitem";

const PlayList = () => {
    return(
        <ul>
            {cartItems.map((item : CartItem) => (
                <Listitem key={item.id} item={item} />
            ))}
        </ul>
    )
}

export default PlayList;