import type { JSX } from "react";
import CartItem from './CartItem';
import { useCartInfo } from "../hooks/useCartStore";
import { useTransition, animated } from "@react-spring/web";

const CartList = (): JSX.Element => {
  const { cartItems } = useCartInfo();

  const transitions = useTransition(cartItems, {
    keys: item => item.id,
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateX(-50px)" },
    config: { duration: 300 }
  });

  return (
    <div className='flex flex-col items-center justify-center'>
      <ul>
        {transitions((style, item) => (
          <animated.li style={style} key={item.id}>
            <CartItem lp={item} />
          </animated.li>
        ))}
      </ul>
    </div>
  )
}

export default CartList